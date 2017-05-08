import threeFactory from '../../Three/ThreeFactory/ThreeFactory';

export default class Keyboard {
  constructor() {
    this._enabled = false;
    this._velocity = threeFactory.vector3D();
    this._forward = false;
    this._backward = false;
    this._left = false;
    this._right = false;

    this._init();
  }

  _init() {
    document.addEventListener('keydown', this._onKeyDown());
    document.addEventListener('keyup', this._onKeyUp());
  }

  get x() {
    return this._velocity.x;
  }

  get y() {
    return this._velocity.y;
  }

  get z() {
    return this._velocity.z;
  }

  set x(x) {
    this._velocity.x = x;
  }

  set y(y) {
    this._velocity.y = y;
  }

  set z(z) {
    this._velocity.z = z;
  }
  set setEnabled(enabled) {
    this._enabled = enabled;
  }

  get getEnabled() {
    return this._enabled;
  }

  get forward() {
    return this._forward;
  }

  get backward() {
    return this._backward;
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }

  _onKeyDown() {
    return (event) => {
      this._setKeyDown(event.keyCode);
    }
  }

  _onKeyUp() {
    return (event) => {
      this._setKeyUp(event.keyCode);
    }
  }

  _setKeyDown(code) {
    switch (code) {
      case 38: // up
      case 87: // w
        this._forward = true;
        break;
      case 37: // left
      case 65: // a
        this._left = true;
        break;
      case 40: // down
      case 83: // s
        this._backward = true;
        break;
      case 39: // right
      case 68: // d
        this._right = true;
        break;

      default:
        break;
    }
  }

  _setKeyUp(code) {
    switch(code) {
      case 38: // up
      case 87: // w
        this._forward = false;
        break;
      case 37: // left
      case 65: // a
        this._left = false;
        break;
      case 40: // down
      case 83: // s
        this._backward = false;
        break;
      case 39: // right
      case 68: // d
        this._right = false;
        break;

      default:
        break;
    }
  }
}
