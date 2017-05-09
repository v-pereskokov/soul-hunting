export default class Mouse {
  constructor() {
    this._x = 0;
    this._y = 0;

    this.mouseX = 0;
    this.mouseY = 0;

    this._PI_2 = Math.PI / 2;
    this._enabled = false;

    this.viewHalfX = window.innerWidth / 2;
    this.viewHalfY = window.innerHeight / 2;
  }

  set setEnabled(enabled) {
    this._enabled = enabled;
  }

  get getEnabled() {
    return this._enabled;
  }

  onMouseMove1() {
    return event => {
      this.mouseX = event.pageX - this.viewHalfX;
      this.mouseY = event.pageY - this.viewHalfY;
    }
  }

  onMouseMove(camera, yaw) {
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

