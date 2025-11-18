const LitElement = window.LitElement || Object.getPrototypeOf(customElements.get("home-assistant-main"));
const html = window.html;
const css = LitElement.prototype.constructor.css;

class NickLightCard extends LitElement {
  static get properties() {
    return {
      hass: {},
      _config: {},
      _mode: { type: String }, // "brightness" or "color_temp"
    };
  }

  static get styles() {
    return css`
      :host {
        --nick-light-card-border-radius: 12px;
        --nick-light-card-padding: 8px 10px;
        --nick-light-card-bg: rgba(0, 0, 0, 0.15);
        --nick-light-card-bg-on: rgba(255, 255, 255, 0.06);
        --nick-light-card-border: 1px solid rgba(255, 255, 255, 0.1);
        --nick-light-card-icon-size: 24px;
        --nick-light-card-button-height: 26px;
        --nick-light-card-button-min-width: 32px;
        --nick-light-card-button-padding: 0 8px;
        --nick-light-card-button-radius: 999px;
        --nick-light-card-slider-width: 160px;
        --nick-light-card-slider-height: 6px;
        display: block;
      }

      .card {
        box-sizing: border-box;
        border-radius: var(--nick-light-card-border-radius);
        padding: var(--nick-light-card-padding);
        border: var(--nick-light-card-border);
        background: var(--nick-light-card-bg);
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
      }

      .card.on {
        background: var(--nick-light-card-bg-on);
      }

      .left {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 0;
      }

      .icon {
        width: var(--nick-light-card-icon-size);
        height: var(--nick-light-card-icon-size);
        flex-shrink: 0;
      }

      .name {
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      }

      .buttons {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-left: 6px;
      }

      .right {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-left: auto;
        cursor: default;
      }

      button.icon-btn {
        height: var(--nick-light-card-button-height);
        min-width: var(--nick-light-card-button-min-width);
        padding: var(--nick-light-card-button-padding);
        border-radius: var(--nick-light-card-button-radius);
        border: 1px solid rgba(255, 255, 255, 0.15);
        background: rgba(0, 0, 0, 0.3);
        color: var(--primary-text-color);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 4px;
        font-size: 11px;
        line-height: 1;
        cursor: pointer;
      }

      button.icon-btn.active {
        background: rgba(255, 255, 255, 0.12);
        border-color: rgba(255, 255, 255, 0.4);
      }

      button.icon-btn:focus {
        outline: none;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.25);
      }

      .slider-wrapper {
        width: var(--nick-light-card-slider-width);
        display: flex;
        align-items: center;
      }

      input[type="range"] {
        -webkit-appearance: none;
        width: 100%;
        height: var(--nick-light-card-slider-height);
        border-radius: 999px;
        background-color: rgba(255, 255, 255, 0.08);
        outline: none;
        margin: 0;
        padding: 0;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid rgba(0, 0, 0, 0.5);
        cursor: pointer;
        margin-top: calc((var(--nick-light-card-slider-height) - 14px) / 2);
      }

      input[type="range"]::-moz-range-thumb {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #fff;
        border: 2px solid rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }

      input[type="range"]::-moz-range-track {
        height: var(--nick-light-card-slider-height);
        border-radius: 999px;
        background: transparent;
      }

      .effects-menu {
        position: absolute;
        z-index: 1000;
        margin-top: 4px;
        padding: 4px 0;
        border-radius: 8px;
        background: var(--card-background-color, #222);
        border: 1px solid rgba(255, 255, 255, 0.15);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        min-width: 140px;
      }

      .effects-menu-item {
        padding: 4px 10px;
        font-size: 12px;
        cursor: pointer;
        white-space: nowrap;
      }

      .effects-menu-item:hover {
        background: rgba(255, 255, 255, 0.08);
      }
    `;
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error("Entity is required");
    }
    this._config = config;
  }

  getCardSize() {
    return 1;
  }

  _getEntity() {
    if (!this.hass || !this._config || !this._config.entity) return null;
    return this.hass.states[this._config.entity];
  }

  _ensureMode(stateObj) {
    if (!stateObj) return;
    const attrs = stateObj.attributes || {};
    const supportsBrightness =
      "brightness" in attrs ||
      (Array.isArray(attrs.supported_color_modes) &&
        attrs.supported_color_modes.some((m) =>
          ["brightness", "hs", "rgb", "xy", "color_temp"].includes(m)
        ));
    const supportsColorTemp =
      "color_temp" in attrs ||
      (Array.isArray(attrs.supported_color_modes) &&
        attrs.supported_color_modes.includes("color_temp"));

    if (!supportsBrightness && !supportsColorTemp) {
      this._mode = undefined;
      return;
    }
    if (!supportsBrightness && supportsColorTemp) {
      this._mode = "color_temp";
      return;
    }
    if (supportsBrightness && !supportsColorTemp) {
      this._mode = "brightness";
      return;
    }
    if (!this._mode) {
      this._mode = "brightness";
    }
  }

  _hasBrightness(stateObj) {
    if (!stateObj) return false;
    const attrs = stateObj.attributes || {};
    return (
      "brightness" in attrs ||
      (Array.isArray(attrs.supported_color_modes) &&
        attrs.supported_color_modes.some((m) =>
          ["brightness", "hs", "rgb", "xy", "color_temp"].includes(m)
        ))
    );
  }

  _hasColorTemp(stateObj) {
    if (!stateObj) return false;
    const attrs = stateObj.attributes || {};
    return (
      "color_temp" in attrs ||
      (Array.isArray(attrs.supported_color_modes) &&
        attrs.supported_color_modes.includes("color_temp"))
    );
  }

  _hasEffects(stateObj) {
    if (!stateObj) return false;
    const attrs = stateObj.attributes || {};
    return Array.isArray(attrs.effect_list) && attrs.effect_list.length > 0;
  }

  _hasMotion() {
    return !!this._config.motion_entity;
  }

  _showModeToggle(stateObj) {
    return this._hasBrightness(stateObj) && this._hasColorTemp(stateObj);
  }

  _currentSliderMode(stateObj) {
    this._ensureMode(stateObj);
    return this._mode;
  }

  _computeBrightnessGradient(stateObj) {
    const attrs = stateObj?.attributes || {};
    let hs = attrs.hs_color;
    let gradient;
    if (Array.isArray(hs) && hs.length >= 2) {
      const h = hs[0];
      const s = Math.max(30, Math.min(100, hs[1] || 100));
      gradient = `linear-gradient(to right,
        hsla(${h}, ${s}%, 50%, 0.15),
        hsla(${h}, ${s}%, 50%, 1)
      )`;
    } else if (Array.isArray(attrs.rgb_color) && attrs.rgb_color.length >= 3) {
      const [r, g, b] = attrs.rgb_color;
      gradient = `linear-gradient(to right,
        rgba(${r}, ${g}, ${b}, 0.15),
        rgba(${r}, ${g}, ${b}, 1)
      )`;
    } else {
      gradient = "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,1))";
    }
    return gradient;
  }

  _computeTempGradient(stateObj) {
    // Simple warm -> cool gradient
    return "linear-gradient(to right, #ffb74d, #fffde7, #90caf9)";
  }

  _onCardClick(e) {
    e.stopPropagation();
    const stateObj = this._getEntity();
    if (!stateObj || !this.hass) return;
    const isOn = stateObj.state === "on";
    this.hass.callService("light", "toggle", {
      entity_id: stateObj.entity_id,
    });
  }

  _onEffectsClick(e) {
    e.stopPropagation();
    this._effectsOpen = !this._effectsOpen;
    this.requestUpdate();
  }

  _onEffectSelect(effect, e) {
    e.stopPropagation();
    const stateObj = this._getEntity();
    if (!stateObj || !this.hass) return;
    this.hass.callService("light", "turn_on", {
      entity_id: stateObj.entity_id,
      effect: effect,
    });
    this._effectsOpen = false;
    this.requestUpdate();
  }

  _onMotionClick(e) {
    e.stopPropagation();
    if (!this._config.motion_entity || !this.hass) return;
    const motionEntity = this.hass.states[this._config.motion_entity];
    const domain = motionEntity ? motionEntity.entity_id.split(".")[0] : "input_boolean";
    let service = "toggle";
    if (domain === "input_boolean") {
      service = "toggle";
    } else if (domain === "switch") {
      service = "toggle";
    } else {
      service = "toggle";
    }
    this.hass.callService(domain, service, {
      entity_id: this._config.motion_entity,
    });
  }

  _onModeToggleClick(e) {
    e.stopPropagation();
    const stateObj = this._getEntity();
    if (!stateObj) return;
    const hasB = this._hasBrightness(stateObj);
    const hasT = this._hasColorTemp(stateObj);
    if (!hasB || !hasT) return;
    this._mode = this._mode === "brightness" ? "color_temp" : "brightness";
    this.requestUpdate();
  }

  _onSliderChange(e) {
    e.stopPropagation();
    const stateObj = this._getEntity();
    if (!stateObj || !this.hass) return;
    const mode = this._currentSliderMode(stateObj);
    const value = Number(e.target.value);
    const payload = { entity_id: stateObj.entity_id };
    if (mode === "color_temp") {
      payload.color_temp = value;
    } else {
      // default to brightness
      payload.brightness = value;
    }
    this.hass.callService("light", "turn_on", payload);
  }

  render() {
    const stateObj = this._getEntity();
    if (!stateObj) {
      return html`<ha-card>Entity not found</ha-card>`;
    }

    const attrs = stateObj.attributes || {};
    const isOn = stateObj.state === "on";

    const hasB = this._hasBrightness(stateObj);
    const hasT = this._hasColorTemp(stateObj);
    const hasEffects = this._hasEffects(stateObj);
    const hasMotion = this._hasMotion();
    const showModeToggle = this._showModeToggle(stateObj);
    const mode = this._currentSliderMode(stateObj) || (hasB ? "brightness" : hasT ? "color_temp" : "brightness");

    let sliderMin = 0;
    let sliderMax = 255;
    let sliderVal = 0;
    let sliderBg = "linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,1))";

    if (mode === "color_temp" && hasT) {
      sliderMin = attrs.min_mireds || 153;
      sliderMax = attrs.max_mireds || 500;
      sliderVal = attrs.color_temp || sliderMax;
      sliderBg = this._computeTempGradient(stateObj);
    } else if (hasB) {
      sliderMin = 1;
      sliderMax = 255;
      sliderVal = attrs.brightness != null ? attrs.brightness : sliderMax;
      sliderBg = this._computeBrightnessGradient(stateObj);
    }

    const icon =
      this._config.icon ||
      attrs.icon ||
      (stateObj.entity_id.startsWith("switch.") ? "mdi:light-switch" : "mdi:lightbulb");

    const motionEntity = hasMotion ? this.hass.states[this._config.motion_entity] : null;
    const motionOn = motionEntity && motionEntity.state === "on";

    const effectsBtn = hasEffects
      ? html`
          <div style="position: relative;">
            <button class="icon-btn" @click=${this._onEffectsClick.bind(this)}>
              <ha-icon icon="mdi:auto-fix"></ha-icon>
            </button>
            ${this._effectsOpen
              ? html`<div class="effects-menu" @click=${(e) => e.stopPropagation()}>
                  ${attrs.effect_list.map(
                    (eff) => html`<div
                      class="effects-menu-item"
                      @click=${(e) => this._onEffectSelect(eff, e)}
                    >
                      ${eff}
                    </div>`
                  )}
                </div>`
              : ""}
          </div>
        `
      : null;

    const motionBtn = hasMotion
      ? html`
          <button
            class="icon-btn ${motionOn ? "active" : ""}"
            title="Toggle motion"
            @click=${this._onMotionClick.bind(this)}
          >
            <ha-icon icon="mdi:run-fast"></ha-icon>
          </button>
        `
      : null;

    const modeBtn = showModeToggle
      ? html`
          <button
            class="icon-btn"
            title="Toggle brightness / temperature"
            @click=${this._onModeToggleClick.bind(this)}
          >
            <ha-icon icon=${mode === "color_temp" ? "mdi:thermometer" : "mdi:brightness-6"}></ha-icon>
          </button>
        `
      : null;

    return html`
      <div class="card ${isOn ? "on" : ""}" @click=${this._onCardClick.bind(this)}>
        <div class="left">
          <ha-icon class="icon" .icon=${icon}></ha-icon>
          <div class="name">${this._config.name || attrs.friendly_name || stateObj.entity_id}</div>
          <div class="buttons" @click=${(e) => e.stopPropagation()}>
            ${effectsBtn} ${motionBtn}
          </div>
        </div>
        <div class="right" @click=${(e) => e.stopPropagation()}>
          ${modeBtn}
          ${hasB || (mode === "color_temp" && hasT)
            ? html`
                <div class="slider-wrapper">
                  <input
                    type="range"
                    min=${sliderMin}
                    max=${sliderMax}
                    .value=${String(sliderVal)}
                    style=${`background: ${sliderBg};`}
                    @change=${this._onSliderChange.bind(this)}
                  />
                </div>
              `
            : null}
        </div>
      </div>
    `;
  }
}

customElements.define("nick-light-card", NickLightCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "nick-light-card",
  name: "Nick Light Card",
  description: "Compact light card with effects, motion toggle, and brightness/temperature slider.",
});
