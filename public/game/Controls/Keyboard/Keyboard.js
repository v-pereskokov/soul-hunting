import {MOVESPEED, HIGHSPEED} from '../../Constants/Constants';
import gameAudioManager from "../../Manager/GameAudioManager/GameAudioManager";

export default class Keyboard {
  constructor() {
    this._init();

    this._shiftBlock = document.body.querySelector('.weapon__wrapper-img');
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

    if (this._shift) {
      this._shiftBlock.classList.remove('swaying');
      this._shiftBlock.classList.add('swaying-run');
    } else {
      this._shiftBlock.classList.remove('swaying-run');
      this._shiftBlock.classList.add('swaying');
    }

    if (this.forward) {
      camera.translateZ(-(actualMoveSpeed * (1 + delta) + (this._shift ? delta * HIGHSPEED : 0)));
      if (checkCollision(camera.position)) {
        camera.translateZ(actualMoveSpeed * (1 + delta) + (this._shift ? delta * HIGHSPEED : 0));
      }
    }
    if (this.backward) {
      camera.translateZ(actualMoveSpeed + (this._shift ? delta * HIGHSPEED : 0));
      if (checkCollision(camera.position)) {
        camera.translateZ(-(actualMoveSpeed * (1 + delta) + (this._shift ? delta * HIGHSPEED : 0)));
      }
    }

    if (this.left) {
      camera.translateX(-(actualMoveSpeed + (this._shift ? delta * HIGHSPEED : 0)));
      if (checkCollision(camera.position)) {
        camera.translateX(actualMoveSpeed * (1 + delta) + (this._shift ? delta * HIGHSPEED : 0));
      }
    }
    if (this.right) {
      camera.translateX(actualMoveSpeed + (this._shift ? delta * HIGHSPEED : 0));
      if (checkCollision(camera.position)) {
        camera.translateX(-(actualMoveSpeed * (1 + delta) + (this._shift ? delta * HIGHSPEED : 0)));
      }
    }

    const sound = gameAudioManager.getSound('moving');

    if (sound) {
      if (this.forward || this.backward ||
        this.left || this.right) {
        if (!sound.isPlaying) {
          sound.play();
        }
      } else {
        if (sound.isPlaying) {
          setTimeout(() => {
            sound.stop();
          }, 100);
        }
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

  get shift() {
    return this._shift;
  }

  _onKeyDown() {
    return (event) => {
      // event.preventDefault();

      this._setKeyDown(event.keyCode);
    }
  }

  _onKeyUp() {
    return (event) => {
      // event.preventDefault();

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
      case 16:
        this._shift = true;
        break;

      default:
        break;
    }
  }

  _setKeyUp(code) {
    switch (code) {
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
      case 16:
        this._shift = false;
        break;

      default:
        break;
    }
  }

  _activeTable() {
    document.addEventListener('keydown', this._tabOpen());
    document.addEventListener('keyup', this._tabClose());
  }

  _deactivateTable() {
    document.removeEventListener('keydown', this._tabOpen());
    document.removeEventListener('keyup', this._tabClose());
  }

  // bag prevent -> not console -> not nothin'
  _tabOpen() {
    return event => {
      event.preventDefault();

      if (event.keyCode === 9) {
        this._table.style.display = 'block';
      }
    }
  }

  _tabClose() {
    return event => {
      event.preventDefault();

      if (event.keyCode === 9) {
        this._table.style.display = 'none';
      }
    }
  }
}
