export default class CheckPointerLockApi {
  constructor() {
    this._isHave = this._checkApi();
  }

  get isHave() {
    return this._isHave;
  }

  addPointerLockChange(callback) {
    if (this.isHave) {
      document.addEventListener('pointerlockchange', callback);
      document.addEventListener('webkitpointerlockchange', callback);
    }
  }

  addPointerLockError(callback) {
    if (this.isHave) {
      document.addEventListener('pointerlockerror', callback);
      document.addEventListener('webkitpointerlockerror', callback);
    }
  }

  _checkApi() {
    return 'pointerLockElement' in document ||
      'mozPointerLockElement' in document ||
      'webkitPointerLockElement' in document;
  }
}