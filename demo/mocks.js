/**
 * Mock Home Assistant core UI components for the demo.
 * These simulate the behavior of the real components found in Home Assistant.
 */

class HaCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  set header(val) {
    this._header = val;
    this.render();
  }
  get header() {
    return this._header;
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: var(--ha-card-background, #fff);
          border-radius: var(--ha-card-border-radius, 12px);
          box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
          color: var(--primary-text-color);
        }
        .header {
          padding: 24px 16px 16px;
          font-size: 24px;
          line-height: 1.2;
          font-weight: 400;
        }
      </style>
      ${this._header ? `<div class="header">${this._header}</div>` : ''}
      <slot></slot>
    `;
  }
}
if (!customElements.get('ha-card')) customElements.define('ha-card', HaCard);

class HaStateIcon extends HTMLElement {
  static get observedAttributes() {
    return ['style', 'icon'];
  }
  attributeChangedCallback() {
    this.render();
  }
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  set icon(val) {
    this._icon = val;
    this.render();
  }
  get icon() {
    return this._icon;
  }
  set stateObj(val) {
    this._stateObj = val;
    this.render();
  }
  get stateObj() {
    return this._stateObj;
  }
  set hass(val) {
    this._hass = val;
    this.render();
  }
  get hass() {
    return this._hass;
  }

  connectedCallback() {
    this.render();
  }

  render() {
    let iconStr = this.getAttribute('icon') || this._icon;
    if (!iconStr && this._hass && this._stateObj) {
      const entityConf = this._hass.entities[this._stateObj.entity_id];
      if (entityConf) iconStr = entityConf.icon;
    }

    let iconHtml = '';
    if (iconStr) {
      const iconName = iconStr.replace('mdi:', 'mdi-');
      const isActive = this._stateObj && this._stateObj.state === 'on';
      const color = this.style.color || (isActive ? 'var(--state-icon-active-color)' : 'var(--state-icon-color)');
      iconHtml = `<span class="mdi ${iconName}" style="font-size: 24px; color: ${color}"></span>`;
    }

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font@7.4.47/css/materialdesignicons.min.css">
      <style>
        :host {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
        }
      </style>
      ${iconHtml}
    `;
  }
}
if (!customElements.get('ha-state-icon')) customElements.define('ha-state-icon', HaStateIcon);

class HaIcon extends HaStateIcon {}
if (!customElements.get('ha-icon')) customElements.define('ha-icon', HaIcon);

class HaSwitch extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._checked = false;
  }
  set checked(val) {
    this._checked = !!val;
    this.render();
  }
  get checked() {
    return this._checked;
  }

  connectedCallback() {
    this.render();
  }

  toggle() {
    this.checked = !this.checked;
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { checked: this._checked },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const isChecked = this._checked;
    const trackBg = isChecked ? 'var(--primary-color, #03a9f4)' : '#b3b3b3';
    const thumbBg = isChecked ? 'var(--primary-color, #03a9f4)' : '#fff';
    const thumbTransform = isChecked ? 'transform: translateX(18px);' : 'transform: translateX(0);';

    this.shadowRoot.innerHTML = `
      <style>
        :host { display: inline-flex; align-items: center; cursor: pointer; padding: 4px; vertical-align: middle; }
        .switch-container { position: relative; width: 36px; height: 14px; background: ${trackBg}; border-radius: 7px; transition: background 0.28s; opacity: ${isChecked ? 0.5 : 1}; }
        .thumb { position: absolute; top: -3px; left: -1px; width: 20px; height: 20px; background: ${thumbBg}; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.4); transition: transform 0.28s; ${thumbTransform} }
      </style>
      <div class="switch-container"><div class="thumb"></div></div>
    `;
    this.shadowRoot.querySelector('.switch-container').onclick = (e) => {
      e.stopPropagation();
      this.toggle();
    };
  }
}
// FORCE registration by checking if it's already defined as a placeholder
if (!customElements.get('ha-switch') || customElements.get('ha-switch').toString().includes('HTMLElement')) {
  // We can't actually redefine, so we must load this script BEFORE the bundle.
  if (!customElements.get('ha-switch')) customElements.define('ha-switch', HaSwitch);
}

class HaCheckbox extends HaSwitch {
  // Simple reuse for mock
}
if (!customElements.get('ha-checkbox')) customElements.define('ha-checkbox', HaCheckbox);

// --- Editor Mock Components ---
// Approximates Home Assistant's filled Material field so the demo editor reads like
// the real one: tinted box, rounded top, underline that thickens and picks up the
// primary colour on focus, small floating label. Shared by ha-input and ha-select.
const MOCK_FIELD_STYLES = `
  .field {
    background: var(--mdc-text-field-fill-color, rgba(0, 0, 0, 0.05));
    border-radius: 4px 4px 0 0;
    border-bottom: 1px solid var(--mdc-text-field-idle-line-color, rgba(0, 0, 0, 0.42));
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2px;
    min-height: 56px;
    padding: 8px 16px;
  }
  .field:focus-within {
    border-bottom-color: var(--primary-color, #03a9f4);
    box-shadow: inset 0 -1px 0 0 var(--primary-color, #03a9f4);
  }
  .field > label {
    color: var(--secondary-text-color, #727272);
    font-family: inherit;
    font-size: 12px;
    line-height: 1.2;
    /* Keeps a long label on one line so side-by-side fields stay the same height. */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .field:focus-within > label { color: var(--primary-color, #03a9f4); }
  input, select {
    background: transparent;
    border: none;
    box-sizing: border-box;
    color: var(--primary-text-color, #212121);
    font-family: inherit;
    font-size: 16px;
    outline: none;
    padding: 0;
    width: 100%;
  }
  input:disabled, select:disabled { color: var(--secondary-text-color, #727272); }
  input::placeholder { color: var(--secondary-text-color, #727272); opacity: 0.7; }
  .field.select { position: relative; }
  select { appearance: none; padding-right: 24px; text-overflow: ellipsis; }
  .field.select::after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid var(--secondary-text-color, #727272);
    content: '';
    pointer-events: none;
    position: absolute;
    right: 16px;
    top: 50%;
  }
  .helper {
    color: var(--secondary-text-color, #727272);
    font-family: inherit;
    font-size: 12px;
    line-height: 1.3;
    padding: 4px 16px 0;
  }
`;

class HaTextfield extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  get value() {
    return this.shadowRoot.querySelector('input').value;
  }
  set value(val) {
    if (this.shadowRoot.querySelector('input')) this.shadowRoot.querySelector('input').value = val || '';
    this._value = val;
  }
  set label(val) {
    this._label = val;
    this.render();
  }
  set type(val) {
    this._type = val;
    this.render();
  }
  get type() {
    return this.getAttribute('type') || this._type;
  }
  set configValue(val) {
    this.dataset.configValue = val;
  }
  get configValue() {
    return this.dataset.configValue;
  }
  set helper(val) {
    this._helper = val;
    this.render();
  }
  set placeholder(val) {
    this._placeholder = val;
    this.render();
  }
  set disabled(val) {
    this._disabled = val;
    this.render();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>${MOCK_FIELD_STYLES}</style>
      <div class="field">
        <label>${this._label || ''}</label>
        <input type="${this.getAttribute('type') || this._type || 'text'}" />
      </div>
      ${this._helper ? `<div class="helper">${this._helper}</div>` : ''}
    `;
    const input = this.shadowRoot.querySelector('input');
    // Assigned as properties, not interpolated into the markup: a value_transform
    // expression may contain quotes, which would break out of the attribute.
    input.value = this._value ?? '';
    input.placeholder = this._placeholder ?? '';
    input.disabled = !!this._disabled;
    input.addEventListener('input', (e) => {
      this._value = e.target.value;
      this.dispatchEvent(new Event('value-changed', { bubbles: true, composed: true }));
    });
    input.addEventListener('change', (e) => {
      this._value = e.target.value;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    });
  }
}
if (!customElements.get('ha-textfield')) customElements.define('ha-textfield', HaTextfield);
// The editor moved from ha-textfield to ha-input in ec084d2 but this file kept only
// the old name, so every text field in the demo rendered as an empty 0px element.
if (!customElements.get('ha-input')) customElements.define('ha-input', class extends HaTextfield {});
if (!customElements.get('ha-icon-picker')) customElements.define('ha-icon-picker', class extends HaTextfield {});
if (!customElements.get('ha-entity-picker')) customElements.define('ha-entity-picker', class extends HaTextfield {});

class HaSlider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  get value() {
    return Number(this.shadowRoot.querySelector('input').value);
  }
  set value(val) {
    if (this.shadowRoot.querySelector('input')) this.shadowRoot.querySelector('input').value = val;
    this._value = val;
  }
  set min(val) {
    this._min = val;
    this.render();
  }
  set max(val) {
    this._max = val;
    this.render();
  }
  set step(val) {
    this._step = val;
    this.render();
  }
  set configValue(val) {
    this.dataset.configValue = val;
  }
  get configValue() {
    return this.dataset.configValue;
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const min = this.getAttribute('min') ?? this._min ?? 0;
    const max = this.getAttribute('max') ?? this._max ?? 100;
    const step = this.getAttribute('step') ?? this._step ?? 1;
    const val = this._value !== undefined ? this._value : (this.getAttribute('value') ?? min);
    this.shadowRoot.innerHTML = `
      <input type="range" min="${min}" max="${max}" step="${step}" value="${val}" style="width:100%" />
    `;
    this.shadowRoot.querySelector('input').addEventListener('input', (e) => {
      this._value = e.target.value;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.dispatchEvent(new Event('value-changed', { bubbles: true, composed: true }));
    });
  }
}
if (!customElements.get('ha-slider')) customElements.define('ha-slider', HaSlider);

class HaDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  get value() {
    return this.shadowRoot.querySelector('select')?.value || this._value;
  }
  set value(val) {
    this._value = val;
    const select = this.shadowRoot.querySelector('select');
    if (select) select.value = val;
  }
  set label(val) {
    this._label = val;
    this.render();
  }
  set configValue(val) {
    this.dataset.configValue = val;
  }
  get configValue() {
    return this.dataset.configValue;
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        select { width: 100%; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-family: inherit; font-size: 14px; }
        .slot-container { display: none; }
      </style>
      <label style="font-size:12px; color:#666; display:block; font-family: inherit; margin-bottom: 4px;">${this._label || ''}</label>
      <select></select>
      <div class="slot-container"><slot></slot></div>
    `;
    this.shadowRoot.querySelector('select').addEventListener('change', (e) => {
      this._value = e.target.value;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.dispatchEvent(new Event('value-changed', { bubbles: true, composed: true }));
      this.dispatchEvent(
        new CustomEvent('wa-select', {
          bubbles: true,
          composed: true,
          detail: { item: { value: e.target.value } },
        }),
      );
    });

    this.shadowRoot.querySelector('slot').addEventListener('slotchange', (e) => {
      const select = this.shadowRoot.querySelector('select');
      select.innerHTML = '';
      const nodes = e.target.assignedNodes();
      nodes.forEach((n) => {
        if (n.tagName === 'HA-DROPDOWN-ITEM') {
          const opt = document.createElement('option');
          opt.value = n.getAttribute('value');
          opt.textContent = n.textContent;
          if (opt.value === this._value) opt.selected = true;
          select.appendChild(opt);
        }
      });
    });
  }
}
if (!customElements.get('ha-dropdown')) customElements.define('ha-dropdown', HaDropdown);
if (!customElements.get('ha-dropdown-item')) customElements.define('ha-dropdown-item', class extends HTMLElement {});

class HaSelect extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  get value() {
    return this.shadowRoot.querySelector('select')?.value || this._value;
  }
  set value(val) {
    this._value = val;
    const select = this.shadowRoot.querySelector('select');
    if (select) select.value = val;
  }
  set label(val) {
    this._label = val;
    this.render();
  }
  set configValue(val) {
    this.dataset.configValue = val;
  }
  get configValue() {
    return this.dataset.configValue;
  }
  set options(opts) {
    this._options = opts;
    this.render();
  }
  get options() {
    return this._options || [];
  }
  connectedCallback() {
    this.render();
  }
  render() {
    const opts = this._options || [];
    const optionsHtml = opts
      .map((o) => `<option value="${o.value}" ${o.value === this._value ? 'selected' : ''}>${o.label}</option>`)
      .join('');

    this.shadowRoot.innerHTML = `
      <style>${MOCK_FIELD_STYLES}</style>
      <div class="field select">
        <label>${this._label || ''}</label>
        <select>${optionsHtml}</select>
      </div>
    `;
    this.shadowRoot.querySelector('select').addEventListener('change', (e) => {
      this._value = e.target.value;
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
      this.dispatchEvent(new Event('value-changed', { bubbles: true, composed: true }));
      this.dispatchEvent(
        new CustomEvent('selected', {
          bubbles: true,
          composed: true,
          detail: { value: e.target.value },
        }),
      );
    });
  }
}
if (!customElements.get('ha-select')) customElements.define('ha-select', HaSelect);

class HaFormfield extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  set label(val) {
    this._label = val;
    this.render();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>label { display: flex; align-items: center; font-family: inherit; font-size: 14px; gap: 8px; padding: 4px 0; }</style>
      <label><slot></slot> ${this._label || ''}</label>
    `;
  }
}
if (!customElements.get('ha-formfield')) customElements.define('ha-formfield', HaFormfield);

class HaButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<button style="padding: 6px 12px; border: none; background: #03a9f4; color: white; border-radius: 4px; cursor: pointer; font-family: inherit; font-size: 14px; margin-top: 8px;"><slot></slot></button>`;
  }
}
if (!customElements.get('ha-button')) customElements.define('ha-button', HaButton);

class HaIconButton extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  connectedCallback() {
    this.shadowRoot.innerHTML = `<button style="background:none; border:none; cursor:pointer; padding: 4px;"><slot></slot></button>`;
  }
}
if (!customElements.get('ha-icon-button')) customElements.define('ha-icon-button', HaIconButton);

class HaExpansionPanel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  set header(val) {
    this._header = val;
    this.render();
  }
  // The editor binds .expanded to open a section that the row already uses.
  set expanded(val) {
    this._expanded = val;
    this.render();
  }
  connectedCallback() {
    this.render();
  }
  render() {
    this.shadowRoot.innerHTML = `
      <style>
        details { border: 1px solid #ccc; border-radius: 4px; padding: 12px; margin-bottom: 12px; font-family: inherit; }
        summary { font-weight: 500; cursor: pointer; font-family: inherit; font-size: 15px; }
        .content { margin-top: 12px; }
      </style>
      <details${this._expanded ? ' open' : ''}>
        <summary>${this._header || 'Details'}</summary>
        <div class="content"><slot></slot></div>
      </details>
    `;
  }
}
if (!customElements.get('ha-expansion-panel')) customElements.define('ha-expansion-panel', HaExpansionPanel);
