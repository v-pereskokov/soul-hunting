import Mouse from '../../Controls/Mouse/Mouse';
import Keyboard from '../../Controls/Keyboard/Keyboard';
import PointerLockApiManager from '../../Manager/PointerLockApiManager/PointerLockApiManager';
import musicService from '../../Tools/MusicService/MusicService';
import countNumbers from '../../Tools/CountNumbers/CountNumbers';
import GameWebSocketManager from '../../Manager/GameWebSocketManager/GameWebSocketManager';

export default class Game {
  constructor(functionGo, type = null) {
    this._type = type;
    this._keys = new Keyboard();
    this._mouse = new Mouse();

    this._ws = null;

    if (this._type) {
      this._ws = new GameWebSocketManager();

      this._ws._onClose();
    }

    this.startPreview(functionGo);
  }

  start(functionGo) {
    this._gameScene = this._getScene(functionGo, this._type ? this._ws : null);
    this._pointerLockManager = this._getPointerLock(functionGo);

    this._gameScene.setPointerLock(
      (camera) => this._pointerLockManager.getPointerLock(camera)
    );
  }

  startPreview(functionGo) {
    this._togglePreloader(true);

    if (this._ws) {
      const start = Date.now();

      this._ws._onOpen(() => {
        const delta = Date.now - start;

        setTimeout(() => {
          this._startGame(functionGo);
        }, delta > 3000 ? 0 : delta);
      });
    } else {
      setTimeout(() => {
        this._startGame(functionGo);
      }, 3000);
    }
  }

  _startGame(functionGo) {
    this._togglePreloader(false);
    this._setInstructions();
    this.start(functionGo);
  }

  _setInstructions() {
    document.body.querySelector('.instructions').style.cursor = 'pointer';
  }

  _togglePreloader(type) {
    document.body.querySelector('.pre-loader__wrapper').style.display = type ? 'block' : 'none';
  }

  _getScene(functionGo, webSocket = null) {

  }

  _getPointerLock(functionGo) {
    return new PointerLockApiManager({
        blocker: document.body.querySelector('.blocker'),
        instructions: document.body.querySelector('.instructions')
      },
      this._keys,
      this._mouse,
      (isFirst) => {
        if (isFirst) {
          this._gameScene._init();
          this._gameScene._animate();

          setTimeout(() => {
            this._gameScene.stop();
          }, 5);

          document.body.querySelector('.wrapper__game').style.display = 'block';

          this._beforeStart();
        } else {
          this._gameScene.resume();
          this._gameScene._animate();
        }
      },
      () => {
        this._gameScene.stop();
        this._gameScene._animate();
      },
      functionGo
    );
  }

  _beforeStart() {
    const end = document.body.querySelector('.end');
    const counterWrapper = document.body.querySelector('.counter');

    const counter = counterWrapper.querySelector('.count__parent-child-text2');

    musicService.startBeforeGame();

    countNumbers(9, 1000,
      (count) => {
        counter.innerHTML = count;

        if (count & 1) {
          end.style.opacity = `0.` + count;
        }
      },
      () => {
        counterWrapper.style.display = 'none';

        this._gameScene.resume();
        this._gameScene._game = true;
        this._gameScene._animate();
      });
  }
}
