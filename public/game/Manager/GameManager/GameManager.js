import GameScene from "../../GameScene/GameScene";
import Mouse from "../../Controls/Mouse/Mouse";
import Keyboard from "../../Controls/Keyboard/Keyboard";
import PointerLockApiManager from "../PointerLockApiManager/PointerLockApiManager";

export default class GameManager {
  constructor() {
    this._mouse = new Mouse();
    this._keys = new Keyboard();

    this._gameScene = this._getScene();
    this._pointerLockManager = this._getPointerLock();

    this._gameScene.setPointerLock(
      (camera) => this._pointerLockManager.getPointerLock(camera)
    );
  }

  startGame() {
    this._gameScene.start();
  }

  _getScene() {
    return new GameScene(
      this._keys,
      this._mouse
    );
  }

  _getPointerLock() {
    return new PointerLockApiManager({
        blocker: document.body.querySelector('.blocker'),
        instructions: document.body.querySelector('.instructions')
      },
      this._keys,
      this._mouse,
      () => {
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

// resume + animate
// shift
// tab
// esc
// design game
// validation
// service worker
// verstka mobileelelelleleleleleleleleelelellele
