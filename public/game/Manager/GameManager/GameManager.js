import GameScene from "../../GameScene/GameScene";
import Mouse from "../../Controls/Mouse/Mouse";
import Keyboard from "../../Controls/Keyboard/Keyboard";
import PointerLockApiManager from "../PointerLockApiManager/PointerLockApiManager";
import musicService from '../../Tools/MusicService/MusicService';

export default class GameManager {
  constructor() {
    this._mouse = new Mouse();
    this._keys = new Keyboard();

    musicService.startBackground();
    this.startPreview();
  }

  start(stopMusic) {
    this._gameScene = this._getScene();
    this._pointerLockManager = this._getPointerLock(stopMusic);

    this._gameScene.setPointerLock(
      (camera) => this._pointerLockManager.getPointerLock(camera)
    );
  }

  startPreview() {
    this._togglePreloader(true);

    setTimeout(() => {
      this._togglePreloader(false);
      this._setInstructions();
      this.start(() => musicService.stopBackground());
    }, 3000);
  }

  _setInstructions() {
    document.body.querySelector('.instructions').style.cursor = 'pointer';

  }

  _togglePreloader(type) {
    document.body.querySelector('.pre-loader__wrapper').style.display = type ? 'block' : 'none';
  }

  _getScene() {
    return new GameScene(
      this._keys,
      this._mouse
    );
  }

  _getPointerLock(stopMusic) {
    return new PointerLockApiManager({
        blocker: document.body.querySelector('.blocker'),
        instructions: document.body.querySelector('.instructions')
      },
      this._keys,
      this._mouse,
      (isFirst) => {
        if (isFirst) {
          stopMusic();
          this._gameScene._init();

          document.body.querySelector('.wrapper__game').style.display = 'block';
        }
        this._gameScene.resume();
        this._gameScene._animate();
      },
      () => {
        this._gameScene.stop();
        this._gameScene._animate();
      }
    );
  }
}

// shift
// tab
// esc
// design game
// validation
// service worker
