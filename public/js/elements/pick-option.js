/*
 * Source for custom element <pick-option>
 * A very silly component.
 */
class PickOption extends HTMLElement {
  /**
   * When one of these attributes changes value, it triggers attributeChangedCallback
   * @return {Array} attribute names.
   */
  static get observedAttributes() { return ['selected', 'title']; }
  constructor(self) {
    self = super(self); // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
    self.addEventListener('change', self);
    return self;
  }

  connectedCallback() {
    const { title, list, selected } = this;
    const render = hyperHTML.bind(this);

    render`<h2>${title}</h2>
    <select>${list.map((item) => {
      const attrs = [
        `value=${item.value}`,
        item.value === selected ? 'selected=selected' : '',
      ].join(' ');
      return `<option ${attrs}>${item.title}</option>`;
    })}</select>`;
  }

  /**
   * Triggered when an an observedAttribute has changed.
   * @param {String} attrName - the attribute name.
   * @param {Object} oldValue - the old value.
   * @param {Object} newValue - the new value.
   */
  attributeChangedCallback(attrName, oldValue, newValue) {
    if (oldValue === newValue) { return; }
    this.connectedCallback(); // re-render
  }

  /**
   * An array of {title: '', value: ''} objects to render as options
   */
  get list() {
    return this._list || [];
  }

  set list(value) {
    //PROBLEM: we get lists that look just like our list, but are different refrences.
    // This is an ugly && slow way of checking.
    const isSameArray = JSON.stringify(value) === JSON.stringify(this._list);
    if (isSameArray) { return; }

    this._list = value;
    this.connectedCallback(); // re-render
  }

  get selected() {
    return this.getAttribute('selected');
  }
  set selected(value) {
    if (this.selected === value) { return; }
    if (!value) {
      this.removeAttribute('selected');
    }
    else {
      this.setAttribute('selected', value);
    }
  }

  // transform select change into custom change event.
  onChange(event) {
    const { target } = event;
    const changeEvent = this.getAttribute('change-event');
    const actionEvent = new CustomEvent(changeEvent, {
      bubbles: true,
      detail: Object.assign({}, {
        orginalEvent: event,
        selectedIndex: target.selectedIndex,
        selectedValue: target.selectedOptions[0].value,
        options: target.options,
      }),
    });
    this.dispatchEvent(actionEvent);
  }

  // Easy event to method handling
  // memory safe and effecent by making the browser do the hard work.
  handleEvent(event) {
    const type = event.type.replace(/^(\w)/, (m) => `${m[0].toUpperCase()}`);
    return this[`on${type}`](event);
  }
}
customElements.define('pick-option', PickOption);
