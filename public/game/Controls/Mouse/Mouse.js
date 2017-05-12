import AimManager from "../../Manager/AimManager/AimManager";

export default class Mouse {
  constructor() {
    this._x = 0;
    this._y = 0;

    this._enabled = false;
    this._isGame = false;

    this._aim = new AimManager();
  }

  setEvents(onClickCallback) {
    document.addEventListener('contextmenu', event => {
      event.preventDefault();
    });

    document.addEventListener('click', this.onClickMouse(onClickCallback));
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

  onClickMouse(callback) {
    return event => {
      event.preventDefault();
      if (this._isGame && this._enabled && event.which === 1) {
        this._aim.start();
        callback();
      } else {
        this._isGame = true;
      }
    }
  }
}

