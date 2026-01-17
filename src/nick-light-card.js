import { LitElement, html, css } from 'lit';

class NickLightCard extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
      _config: { type: Object },
      _mode: { type: String },
      _effectsMenuOpen: { type: Boolean }
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .card {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        background: rgba(0, 0, 0, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        cursor: pointer;
        transition: background 0.2s ease;
      }

      .card.on {
        background: rgba(255, 255, 255, 0.06);
      }

      .card:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      .card.on:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .left-section {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
        min-width: 0;
      }

      .icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        color: var(--primary-text-color);
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: var(--primary-text-color);
      }

      .button-group {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .right-section {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-left: auto;
      }

      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 32px;
        height: 28px;
        padding: 0 10px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 16px;
        color: var(--primary-text-color);
        cursor: pointer;
        transition: all 0.2s ease;
        font-size: 11px;
        gap: 4px;
      }

      .btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.25);
      }

      .btn:active {
        transform: scale(0.95);
      }

      .btn.active {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.4);
      }

      .btn ha-icon {
        width: 18px;
        height: 18px;
        pointer-events: none;
      }

      .slider-container {
        width: 160px;
        position: relative;
      }

      input[type="range"] {
        width: 100%;
        height: 6px;
        -webkit-appearance: none;
        appearance: none;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        outline: none;
        cursor: pointer;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        transition: transform 0.1s ease;
      }

      input[type="range"]::-webkit-slider-thumb:hover {
        transform: scale(1.1);
      }

      input[type="range"]::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
      }

      input[type="range"]::-moz-range-track {
        height: 6px;
        background: transparent;
        border-radius: 8px;
      }

      .effects-menu {
        position: absolute;
        top: calc(100% + 4px);
        right: 0;
        min-width: 160px;
        max-height: 300px;
        overflow-y: auto;
        background: var(--card-background-color, #1c1c1c);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        z-index: 1000;
        padding: 4px 0;
      }

      .effects-menu-item {
        padding: 8px 12px;
        font-size: 13px;
        cursor: pointer;
        white-space: nowrap;
        color: var(--primary-text-color);
        transition: background 0.15s ease;
      }

      .effects-menu-item:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      .effects-menu-item.active {
        background: rgba(255, 255, 255, 0.15);
      }

      .button-wrapper {
        position: relative;
      }
    `;
  }

  constructor() {
    super();
    this._mode = 'brightness';
    this._effectsMenuOpen = false;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You must specify an entity');
    }
    this._config = config;
  }

  getCardSize() {
    return 1;
  }

  // Entity helpers
  _getEntity() {
    if (!this.hass || !this._config?.entity) return null;
    return this.hass.states[this._config.entity];
  }

  _getMotionEntity() {
    if (!this.hass || !this._config?.motion_entity) return null;
    return this.hass.states[this._config.motion_entity];
  }

  // Feature detection
  _supportsBrightness(stateObj) {
    if (!stateObj) return false;
    const attrs = stateObj.attributes || {};
    const modes = attrs.supported_color_modes || [];
    return modes.some(mode =>
      ['brightness', 'hs', 'rgb', 'rgbw', 'rgbww', 'xy', 'color_temp'].includes(mode)
    );
  }

  _supportsColorTemp(stateObj) {
    if (!stateObj) return false;
    const modes = stateObj.attributes?.supported_color_modes || [];
    return modes.includes('color_temp');
  }

  _supportsEffects(stateObj) {
    if (!stateObj) return false;
    const effectList = stateObj.attributes?.effect_list || [];
    return effectList.length > 0;
  }

  // Mode management
  _initializeMode(stateObj) {
    if (!this._mode) {
      const supportsBrightness = this._supportsBrightness(stateObj);
      const supportsTemp = this._supportsColorTemp(stateObj);

      if (supportsBrightness) {
        this._mode = 'brightness';
      } else if (supportsTemp) {
        this._mode = 'color_temp';
      }
    }
  }

  _toggleMode() {
    this._mode = this._mode === 'brightness' ? 'color_temp' : 'brightness';
  }

  // Slider calculations
  _getSliderConfig(stateObj) {
    if (!stateObj) {
      return { min: 0, max: 255, value: 0, background: this._getDefaultGradient() };
    }

    const attrs = stateObj.attributes || {};

    if (this._mode === 'color_temp' && this._supportsColorTemp(stateObj)) {
      return {
        min: attrs.min_mireds || 153,
        max: attrs.max_mireds || 500,
        value: attrs.color_temp || attrs.min_mireds || 153,
        background: this._getTempGradient()
      };
    }

    // Brightness mode
    return {
      min: 1,
      max: 255,
      value: attrs.brightness ?? 255,
      background: this._getBrightnessGradient(stateObj)
    };
  }

  _getBrightnessGradient(stateObj) {
    const attrs = stateObj?.attributes || {};

    if (attrs.hs_color && Array.isArray(attrs.hs_color)) {
      const [h, s] = attrs.hs_color;
      const saturation = Math.max(30, Math.min(100, s || 100));
      return `linear-gradient(to right,
        hsla(${h}, ${saturation}%, 20%, 0.2),
        hsla(${h}, ${saturation}%, 50%, 1))`;
    }

    if (attrs.rgb_color && Array.isArray(attrs.rgb_color)) {
      const [r, g, b] = attrs.rgb_color;
      return `linear-gradient(to right,
        rgba(${r}, ${g}, ${b}, 0.2),
        rgba(${r}, ${g}, ${b}, 1))`;
    }

    return this._getDefaultGradient();
  }

  _getTempGradient() {
    return 'linear-gradient(to right, #ff9800, #fff3e0, #90caf9)';
  }

  _getDefaultGradient() {
    return 'linear-gradient(to right, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 1))';
  }

  // Event handlers
  _handleCardClick(e) {
    e.stopPropagation();
    const entity = this._getEntity();
    if (!entity) return;

    this.hass.callService('light', 'toggle', {
      entity_id: entity.entity_id
    });
  }

  _handleModeToggle(e) {
    e.stopPropagation();
    this._toggleMode();
  }

  _handleSliderChange(e) {
    e.stopPropagation();
    const entity = this._getEntity();
    if (!entity) return;

    const value = parseInt(e.target.value);
    const serviceData = { entity_id: entity.entity_id };

    if (this._mode === 'color_temp') {
      serviceData.color_temp = value;
    } else {
      serviceData.brightness = value;
    }

    this.hass.callService('light', 'turn_on', serviceData);
  }

  _handleEffectsToggle(e) {
    e.stopPropagation();
    this._effectsMenuOpen = !this._effectsMenuOpen;
  }

  _handleEffectSelect(effect, e) {
    e.stopPropagation();
    const entity = this._getEntity();
    if (!entity) return;

    this.hass.callService('light', 'turn_on', {
      entity_id: entity.entity_id,
      effect: effect
    });

    this._effectsMenuOpen = false;
  }

  _handleMotionToggle(e) {
    e.stopPropagation();
    const motionEntity = this._getMotionEntity();
    if (!motionEntity) return;

    const domain = motionEntity.entity_id.split('.')[0];
    this.hass.callService(domain, 'toggle', {
      entity_id: motionEntity.entity_id
    });
  }

  // Rendering helpers
  _renderEffectsButton(stateObj) {
    if (!this._supportsEffects(stateObj)) return null;

    const effectList = stateObj.attributes?.effect_list || [];
    const currentEffect = stateObj.attributes?.effect;

    return html`
      <div class="button-wrapper">
        <button
          class="btn ${this._effectsMenuOpen ? 'active' : ''}"
          @click=${this._handleEffectsToggle}
          title="Light Effects"
        >
          <ha-icon icon="mdi:auto-fix"></ha-icon>
        </button>

        ${this._effectsMenuOpen ? html`
          <div class="effects-menu" @click=${e => e.stopPropagation()}>
            ${effectList.map(effect => html`
              <div
                class="effects-menu-item ${currentEffect === effect ? 'active' : ''}"
                @click=${e => this._handleEffectSelect(effect, e)}
              >
                ${effect}
              </div>
            `)}
          </div>
        ` : ''}
      </div>
    `;
  }

  _renderMotionButton() {
    const motionEntity = this._getMotionEntity();
    if (!motionEntity) return null;

    const isOn = motionEntity.state === 'on';

    return html`
      <button
        class="btn ${isOn ? 'active' : ''}"
        @click=${this._handleMotionToggle}
        title="Motion Detection"
      >
        <ha-icon icon="mdi:run-fast"></ha-icon>
      </button>
    `;
  }

  _renderModeToggle(stateObj) {
    const supportsBrightness = this._supportsBrightness(stateObj);
    const supportsTemp = this._supportsColorTemp(stateObj);

    if (!supportsBrightness || !supportsTemp) return null;

    const icon = this._mode === 'color_temp' ? 'mdi:thermometer' : 'mdi:brightness-6';
    const title = this._mode === 'color_temp' ? 'Color Temperature' : 'Brightness';

    return html`
      <button
        class="btn"
        @click=${this._handleModeToggle}
        title="Toggle ${title}"
      >
        <ha-icon icon="${icon}"></ha-icon>
      </button>
    `;
  }

  _renderSlider(stateObj) {
    const supportsBrightness = this._supportsBrightness(stateObj);
    const supportsTemp = this._supportsColorTemp(stateObj);

    if (!supportsBrightness && !supportsTemp) return null;

    const config = this._getSliderConfig(stateObj);

    return html`
      <div class="slider-container">
        <input
          type="range"
          min="${config.min}"
          max="${config.max}"
          .value="${String(config.value)}"
          style="background: ${config.background}"
          @change=${this._handleSliderChange}
          @input=${this._handleSliderChange}
        />
      </div>
    `;
  }

  render() {
    const stateObj = this._getEntity();

    if (!stateObj) {
      return html`
        <ha-card>
          <div style="padding: 16px; color: var(--error-color);">
            Entity not found: ${this._config?.entity}
          </div>
        </ha-card>
      `;
    }

    this._initializeMode(stateObj);

    const isOn = stateObj.state === 'on';
    const attrs = stateObj.attributes || {};
    const icon = this._config.icon || attrs.icon || 'mdi:lightbulb';
    const name = this._config.name || attrs.friendly_name || stateObj.entity_id;

    return html`
      <div class="card ${isOn ? 'on' : ''}" @click=${this._handleCardClick}>
        <div class="left-section">
          <ha-icon class="icon" .icon="${icon}"></ha-icon>
          <div class="name">${name}</div>

          <div class="button-group" @click=${e => e.stopPropagation()}>
            ${this._renderEffectsButton(stateObj)}
            ${this._renderMotionButton()}
          </div>
        </div>

        <div class="right-section" @click=${e => e.stopPropagation()}>
          ${this._renderModeToggle(stateObj)}
          ${this._renderSlider(stateObj)}
        </div>
      </div>
    `;
  }
}

customElements.define('nick-light-card', NickLightCard);

// Register card with HACS/Lovelace
window.customCards = window.customCards || [];
window.customCards.push({
  type: 'nick-light-card',
  name: 'Nick Light Card',
  description: 'A compact light card with effects, motion control, and brightness/temperature slider'
});
