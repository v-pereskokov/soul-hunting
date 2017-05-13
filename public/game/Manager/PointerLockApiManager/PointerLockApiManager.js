import PointerLock from '../../Tools/PointerLock/PointerLock';
import CheckPointerLockApi from '../../Tools/PointerLock/CheckPointerLockApi/CheckPointerLockApi';

export default class PointerLockApiManager {
  constructor(blocks, controls,
              mouse, startCallback,
              stopCallback, functionGo) {
    this._pointerLockApi = new CheckPointerLockApi();
    this._element = document.body;

    this._isFirst = true;

    this._initGameMenu(functionGo);

    this._init(blocks, controls,
      mouse, startCallback,
      stopCallback);
  }

  getPointerLock(camera) {
    return this._pointerLockApi.isHave ? new PointerLock(camera) : null;
  }

  _initGameMenu(functionGo) {
    this._initGameMenuPreferences();

    this._gameMenuButtonExit.addEventListener('click', (event) => {
      event.preventDefault();

      functionGo();
      location.reload();
    });
  }

  _initGameMenuPreferences() {
    this._game = document.body.querySelector('.wrapper__game');
    this._gameMenuBackground = document.body.querySelector('.menu__wrapper');
    this._gameMenuWrapper = document.body.querySelector('.menu__wrapper__parent');
    this._gameMenuButtons = document.body.querySelector('.menu__wrapper__parent-buttons');
    this._gameMenuTopic = document.body.querySelector('.menu__wrapper__parent-topic');

    const buttons = this._gameMenuButtons
      .querySelector('.game__menu-buttons').children;

    this._gameMenuButtonResume = buttons[0];
    this._gameMenuButtonExit = buttons[1];
  }

  _gameMenuOn() {
    this._game.style.filter = 'blur(5px)';

    this._gameMenuBackground.style.display = 'block';
    this._gameMenuWrapper.style.display = 'block';
    this._gameMenuButtons.style.display = 'block';
    this._gameMenuTopic.style.display = 'block';
  }

  _gameMenuOff() {
    this._game.style.filter = '';

    this._gameMenuBackground.style.display = 'none';
    this._gameMenuWrapper.style.display = 'none';
    this._gameMenuButtons.style.display = 'none';
    this._gameMenuTopic.style.display = 'none';
  }

  _init(blocks, controls, mouse, startCallback, stopCallback) {
    this._setBlocks(blocks);
    this._setupPointerLockApi(controls, mouse, startCallback, stopCallback);
  }

  _setBlocks(blocks) {
    this._blocker = blocks.blocker;
    this._instructions = blocks.instructions;
  }

  _setupPointerLockApi(controls, mouse, startCallback, stopCallback) {
    if (this._pointerLockApi.isHave) {
      this._pointerLockApi.addPointerLockChange(this._pointerLockChange(controls, mouse, startCallback, stopCallback));
      this._pointerLockApi.addPointerLockError(this._pointerLockError());

      this._instructions.addEventListener('click', this._instructionsEvent(this._element));
      this._gameMenuButtonResume.addEventListener('click', this._instructionsEvent(this._element));
      document.body.querySelector('.wrapper__game').addEventListener('click', this._instructionsEvent(this._element));
    } else {
      this._instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
    }
  }

  _pointerLockChange(controls, mouse, startCallback, stopCallback) {
    return (event) => {
      event.preventDefault();

      if (this._checkPointerLockElement()) {
        controls.setEnabled = true;
        mouse.setEnabled = true;

        this._isFirst ? this._blocker.style.display = 'none' : this._gameMenuOff();

        startCallback(this._isFirst);
        this._isFirst = false;
      } else {
        stopCallback();

        controls.setEnabled = false;
        mouse.setEnabled = false;

        if (!this._isFirst) {
          this._gameMenuOn();
        }
      }
    }
  }

  _pointerLockError() {
    return (event) => {
      event.preventDefault();
      this._instructions.style.display = '';
    };
  }

  _instructionsEvent(element) {
    return (event) => {
      event.preventDefault();

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
