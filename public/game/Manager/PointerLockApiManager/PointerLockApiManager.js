import PointerLock from '../../Controlls/PointerLock/PointerLock';
import CheckPointerLockApi from '../../Controlls/PointerLock/CheckPointerLockApi/CheckPointerLockApi';

export default class PointerLockApiManager {
  constructor(blocks, controlls, mouse) {
    this._pointerLockApi = new CheckPointerLockApi();
    this._element = document.body;

    this._init(blocks, controlls, mouse);
  }

  getPointerLock(camera) {
    return this._pointerLockApi.isHave ? new PointerLock(camera) : null;
  }

  _init(blocks, controlls, mouse) {
    this._setBlocks(blocks);
    this._setupPointerLockApi(controlls, mouse);
  }

  _setBlocks(blocks) {
    this._blocker = blocks.blocker;
    this._instructions = blocks.instructions;
  }

  _setupPointerLockApi(controlls, mouse) {
    if (this._pointerLockApi.isHave) {
      this._pointerLockApi.addPointerLockChange(this._pointerLockChange(controlls, mouse));
      this._pointerLockApi.addPointerLockError(this._pointerLockError());

      this._instructions.addEventListener('click', this._instructionsEvent(this._element));
    } else {
      this._instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }
  }

  _pointerLockChange(controlls, mouse) {
    return (event) => {
      if (this._checkPointerLockElement()) {
        controlls.setEnabled = true;
        mouse.setEnabled = true;

        this._blocker.style.display = 'none';
      } else {
        mouse.setEnabled = false;

        this._blocker.style.display = '-webkit-box';
        this._blocker.style.display = '-moz-box';
        this._blocker.style.display = 'box';

        this._instructions.style.display = '';
      }
    }
  }

  _pointerLockError() {
    return (event) => {
      this._instructions.style.display = '';
    };
  }

  _instructionsEvent(element) {
    return (event) => {
      this._instructions.style.display = 'none';

      element.requestPointerLock = this._getRequestPointerLock(element);
      element.requestPointerLock();
    }
  }

  _getRequestPointerLock(element) {
    return element.requestPointerLock ||
      element.mozRequestPointerLock ||
      element.webkitRequestPointerLock;
  }

  _checkPointerLockElement() {
    return document.pointerLockElement === this._element ||
      document.mozPointerLockElement === this._element ||
      document.webkitPointerLockElement === this._element;
  }
}
