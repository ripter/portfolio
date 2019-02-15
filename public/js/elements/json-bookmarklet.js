/*
 * Turns a json object into a Tout URL Override Bookmarklet
 */
class JSONBookmarklet extends HTMLElement {
  static get observedAttributes() {
    return ['json', 'title'];
  }

  constructor(self) {
    self = super(self); // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
    return self;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) { return; }
    // re-render on change
    this.connectedCallback();
  }

  connectedCallback() {
    const { href, title } = this;
    const render = hyperHTML.bind(this);

    return render`<a href=${href}>${title || 'Bookmarklet'}</a>`;
  }

  get json() {
    const _json = this.getAttribute('json');
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

  get href() {
    const stringJSON = this.getAttribute('json');
    const code = `const hasOverride = /toutOverrides/.test(location.search);
      const prefix = location.search  === '' ? '?': '&';
      if (hasOverride) {
        TOUT.model.createURLOverride(${stringJSON}, true);
      }
      else {
        location = location.href + prefix + TOUT.model.createURLOverride(${stringJSON});
      }`;

    try {
      return 'javascript:!function(){' + encodeURIComponent(code) + '}()';
    }
    catch(err) {
      console.log('Error stringify json', err);
      return '';
    }
  }
}
customElements.define('json-bookmarklet', JSONBookmarklet);
