/**
 * Simple JSON Editor
 */
class JSONEditor extends HTMLElement {
  static get observedAttributes() {
    return ['json'];
  }

  constructor(self) {
    self = super(self); // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
    this.addEventListener('change', this);
    return self;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) { return; }
    // re-render on change
    this.connectedCallback();
  }

  connectedCallback() {
    const { json } = this;
    const jsonString = JSON.stringify(json, void 0, 2);
    const render = hyperHTML.bind(this);

    return render`<textarea onchange=${this.onChange}>${jsonString}</textarea>`;
  }

  get json() {
    const _json = this.getAttribute('json');
    //Question: why does _json come as the string undefined sometimes? We might be missing a check somewhere
    if (!_json || _json === 'undefined') { return {}; }

    try {
      return JSON.parse(_json);
    }
    catch(err) {
      console.error('Error parsing json', err);
      return {};
    }
  }
  set json(value) {
    try {
      const stringValue = JSON.stringify(value);
      this.setAttribute('json', stringValue);
    }
    catch(err) {
      console.error('Error parsing json', err);
      this.removeAttribue('json');
    }
  }

  // We could use a thin wrapper for handleEvent that maps to local methods
  // (See pick-option.js for an example of that.)
  // but since this is so simple, let's keep it simple.
  handleEvent(event) {
    if (event.type !== 'change') { return ;}
    // Try to convert the textarea value to JSON
    // If we can, trigger a change.
    const elTextarea = this.querySelector('textarea');
    const rawJSON = elTextarea.value;
    try {
      const json = JSON.parse(rawJSON);
      this.json = json;
      this.classList.remove('error--json-invalid')
      this.triggerChange();
    }
    catch(e) {
      console.log('handleEvent ERROR parsing JSON', e);
      this.classList.add('error--json-invalid')
    }
  }

  /**
   * Triggers the custom change event with the new JSON
   */
  triggerChange() {
    const { json } = this;
    const changeEvent = this.getAttribute('change-event');
    const actionEvent = new CustomEvent(changeEvent, {
      bubbles: true,
      detail: Object.assign({}, {
        orginalEvent: event,
        json,
      }),
    });

    this.dispatchEvent(actionEvent);
  }
}
customElements.define('json-editor', JSONEditor);
