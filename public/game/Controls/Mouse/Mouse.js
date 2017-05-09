export default class Mouse {
  constructor() {
    this._x = 0;
    this._y = 0;

    this._enabled = false;
  }

  set setEnabled(enabled) {
    this._enabled = enabled;
  }

  get getEnabled() {
    return this._enabled;
  }

  onMouseMove(camera) {
    return event => {
      if (this._enabled) {
        this._x = event.movementX ||
          event.mozMovementX ||
          event.webkitMovementX ||
          0;

        camera.rotation.y -= this._x * 0.002;
      }
    };
  }

  onMouseDown(callback) {
    return event => {
      if (this._enabled) {
        callback();
      }
    }
  }

  onClickMouse(callback) {
    return event => {
      event.preventDefault();
      if (this._isGame && event.which === 1) {
        callback();
      } else {
        this._isGame = true;
      }
    }
  }
}

