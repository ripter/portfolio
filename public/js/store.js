/**
 * Very Simple Store/State object.
 * on change: document.dispatchEvent('stateChange')
 * @type {[type]}
 */
class Store {
  /*
   * Create a store from a list of environments
   * @param {Array} envs - list of environments.
   */
  constructor(envs) {
    this.environments = envs;
    // set the frist one as default
    this._activeEnv = envs[0];
    this.sdkHost = envs[0].sdkHost;
    this._customURLOverrides = {
      "autoplay": false,
      "muted": true
    };

    // trigger the first change event
    this.dispatchChange();
  }

  dispatchChange() {
    const event = new CustomEvent('stateChange', {
      detail: this,
    });
    document.dispatchEvent(event);
  }

  //
  // I'm using getters/setters here
  // It could easily be reducers or any other struture.
  // The big weaknes with this approach is the work setting up the property and internal pairs.
  // It's helpful when the setter/getter has to do logic, annoying when it doesn't.
  //

  get sdkHost() {
    return this._sdkHost;
  }
  set sdkHost(value) {
    if (this._activeEnv === value) { return; }
    const newEnv = this.environments.find(env => env.sdkHost === value);
    this._activeEnv = newEnv;
    this._sdkHost = newEnv.sdkHost;
    this._brandID = newEnv.brandIDs[0];
    this.brandIDs = newEnv.brandIDs;
    this.dispatchChange();
  }

  get brandID() {
    return this._brandID;
  }
  set brandID(value) {
    if (this._brandID === value) { return; }
    this._brandID = value;
    this.dispatchChange();
  }

  get customURLOverrides() {
    return this._customURLOverrides;
  }
  set customURLOverrides(value) {
    this._customURLOverrides = value;
    // in this case, the get/set is really so we can trigger the change event.
    // If we have a lot of cases like this, the action/reducer/whatever system is nicer
    this.dispatchChange();
  }
}
window.Store = Store;
