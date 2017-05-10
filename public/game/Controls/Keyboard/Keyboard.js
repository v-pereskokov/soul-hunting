import {MOVESPEED} from '../../Constants/Constants';

export default class Keyboard {
  constructor() {
    this._init();
  }

  _init() {
    this._setKeys();

    this._setTable();
  }

  _setKeys() {
    document.addEventListener('keydown', this._onKeyDown());
    document.addEventListener('keyup', this._onKeyUp());
  }

  _setTable() {
    this._table = document.body.querySelector('.gameTable__wrapper');

    this._activeTable();
  }

  update(camera, delta, checkCollision) {
    const actualMoveSpeed = delta * MOVESPEED;

    if (this.forward) {
      camera.translateZ(-(actualMoveSpeed));
      if (checkCollision(camera.position)) {
        camera.translateZ(actualMoveSpeed);
      }
    }
    if (this.backward) {
      camera.translateZ(actualMoveSpeed);
      if (checkCollision(camera.position)) {
        camera.translateZ(-actualMoveSpeed);
      }
    }

    if (this.left) {
      camera.translateX(-actualMoveSpeed);
      if (checkCollision(camera.position)) {
        camera.translateX(actualMoveSpeed);
      }
    }
    if (this.right) {
      camera.translateX(actualMoveSpeed);
      if (checkCollision(camera.position)) {
        camera.translateX(-actualMoveSpeed);
      }
    }
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

  _activeTable() {
    document.addEventListener('keydown', event => {
      if (event.keyCode === 81) {
        this._table.style.display = 'block';
      }
    });
    document.addEventListener('keyup', event => {
      if (event.keyCode === 81) {
        this._table.style.display = 'none';
      }
    });
  }
}
