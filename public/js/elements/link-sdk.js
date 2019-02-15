/*
 * Source for custom element <link-sdk>
 * Source is a seprate file because chrome debugger tools
 * can not debug when the script is in the link-sdk.html file.
 */
class LinkSDK extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'href', 'sdkHost', 'brandID'];
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
    const { title, href, sdkHost, brandID } = this;
    const render = hyperHTML.bind(this);
    const prefix = /\?/.test(href) ? '&': '?';
    const url = `${href}${prefix}sdkHost=${sdkHost}&brandID=${brandID}`;

    return render`<a href=${url} target="_blank">${title}</a>`;
  }

  // getters allows us to use the nicer syntax in connectedCallback
  get href() {
    return this.getAttribute('href');
  }

  get title() {
    return this.getAttribute('title');
  }

  get sdkHost() {
    return this.getAttribute('sdkHost');
  }
  set sdkHost(value) {
    if (value === this.sdkHost) { return; }
    this.setAttribute('sdkHost', value);
    // re-render on change
    this.connectedCallback();
  }

  get brandID() {
    return this.getAttribute('brandID');
  }
  set brandID(value) {
    if (value === this.brandID) { return; }
    this.setAttribute('brandID', value);
    // re-render on change
    this.connectedCallback();
  }
}
customElements.define('link-sdk', LinkSDK);
