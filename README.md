# nick-light-card

A compact Home Assistant custom card for lights that combines:

- Always-visible brightness / color temperature slider
- Slider color that reflects the light's current color
- Optional effects button (if the light supports effects)
- Optional motion toggle button (for an input_boolean or switch)
- Optional mode toggle button (to swap slider between brightness and color temperature)
- Single-row layout, optimized to show many lights at once

## Installation (HACS - Custom Repository)

1. Go to **HACS → Frontend → Custom Repositories**.
2. Add your GitHub repo URL, for example:

   `https://github.com/your-username/nick-light-card`

   - Category: **Lovelace**

3. Install **nick-light-card** from HACS.
4. Make sure the resource is added (HACS usually does this automatically):

   `/hacsfiles/nick-light-card/nick-light-card.js`

   as a **JavaScript Module**.

## Manual Resource (if needed)

In `configuration.yaml` (old style) or via **Settings → Dashboards → Resources**:

```yaml
url: /hacsfiles/nick-light-card/nick-light-card.js
type: module
```

## Usage

Example:

```yaml
type: custom:nick-light-card
entity: light.kitchen
name: Kitchen
motion_entity: input_boolean.kitchen_motion
icon: mdi:knife
```

### Options

- `entity` (required): The light entity.
- `name` (optional): Override name shown on the card.
- `icon` (optional): Override icon (otherwise uses entity icon or `mdi:lightbulb`).
- `motion_entity` (optional): An `input_boolean` or `switch` used to enable/disable motion for this room.

### Behavior

- **Effects button**  
  Appears automatically if the light has an `effect_list` attribute.  
  Clicking opens a small menu with effects; choosing one calls `light.turn_on` with that effect.

- **Motion button**  
  Appears only if `motion_entity` is configured.  
  Clicking toggles the entity (works with `input_boolean` or `switch`).

- **Mode toggle button**  
  Appears only if the light supports both brightness and color temperature.  
  Clicking it switches the slider between:
  - brightness
  - color temperature

- **Slider**  
  - Always visible.
  - Shows brightness or color temperature depending on the active mode.
  - In brightness mode:
    - Track uses a gradient based on the light's current color (`hs_color` or `rgb_color`).
  - In temperature mode:
    - Track shows a warm-to-cool gradient.

- **Card click**  
  Clicking anywhere on the main card (left side) toggles the light on/off.

## Notes

- This card is written as a single JavaScript module and does not require a build step.
- Works with modern Home Assistant versions that provide the `lit` package.
