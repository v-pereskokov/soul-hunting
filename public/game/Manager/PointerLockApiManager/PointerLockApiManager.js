import PointerLock from '../../Tools/PointerLock/PointerLock';
import CheckPointerLockApi from '../../Tools/PointerLock/CheckPointerLockApi/CheckPointerLockApi';

export default class PointerLockApiManager {
  constructor(blocks, controls, mouse) {
    this._pointerLockApi = new CheckPointerLockApi();
    this._element = document.body;

    this._init(blocks, controls, mouse);
  }

  getPointerLock(camera) {
    return this._pointerLockApi.isHave ? new PointerLock(camera) : null;
  }

  _init(blocks, controls, mouse) {
    this._setBlocks(blocks);
    this._setupPointerLockApi(controls, mouse);
  }

  _setBlocks(blocks) {
    this._blocker = blocks.blocker;
    this._instructions = blocks.instructions;
  }

  _setupPointerLockApi(controls, mouse) {
    if (this._pointerLockApi.isHave) {
      this._pointerLockApi.addPointerLockChange(this._pointerLockChange(controls, mouse));
      this._pointerLockApi.addPointerLockError(this._pointerLockError());

      this._instructions.addEventListener('click', this._instructionsEvent(this._element));
    } else {
      this._instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }
  }

  _pointerLockChange(controls, mouse) {
    return (event) => {
      if (this._checkPointerLockElement()) {
        controls.setEnabled = true;
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
