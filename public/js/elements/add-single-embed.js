// Depends on hyperHTML, document-register-element, font awesome
class AddSingleEmbed extends HTMLElement {
  constructor(self) {
    console.log('AddSingleEmbed.constructor', arguments);
    self = super(self); // https://github.com/WebReflection/document-register-element#upgrading-the-constructor-context
    // self.addEventListener('change', self);
    return self;
  }

  render() {
    hyperHTML.bind(this)`
    <i class="fa fa-bars" aria-hidden="true"></i>
    <select class="list-tout-uids">
      <option value="xnau8h">Jungle Mirror</option>
      <option value="ego6vg">Gorilla Pool Party</option>
      <option value="1tr273">Kangaroo collide with cyclist</option>
      <option value="928402903496261633">Otterley adoraball.</option>
      <option value="uc1u5r">Dogs are smarter than cats</option>
      <option value="wjwxk7">10 Things</option>
    </select>
    <button class="button-add" type="button" onclick=${this.addEmbedCode.bind(this)}>
      <i class="fa fa-sign-in" aria-hidden="true"></i>
      Add Embed Code for Tout
    </button>
    `;
  }

  // Creates the tout embed code and adds it to the page.
  addEmbedCode(event) {
    const { selectedToutUid, embedClassName } = this;
    const elSlot = document.createElement('div');

    elSlot.setAttribute('class', embedClassName);
    elSlot.setAttribute('src-tout-uid', selectedToutUid);
    this.parentElement.insertBefore(elSlot, this);
  }

  //
  // Custom Element Lifecycle methods
  connectedCallback() {
    console.log('AddSingleEmbed.connectedCallback', arguments);
    this.render();
  }
  // End Custom Element lifestyle methods
  //

  //
  // Getters/Setters
  get selectedToutUid() {
    const elSelect = this.querySelector('select');
    return elSelect.value;
  }

  get embedClassName() {
    return this.getAttribute('embed-class');
  }
  // End Getters/Setters
  //

}
customElements.define('add-single-embed', AddSingleEmbed);
