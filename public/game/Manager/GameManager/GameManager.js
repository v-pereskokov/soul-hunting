import GameScene from "../../GameScene/GameScene";
import Mouse from "../../Controls/Mouse/Mouse";
import Keyboard from "../../Controls/Keyboard/Keyboard";
import PointerLockApiManager from "../PointerLockApiManager/PointerLockApiManager";

export default class GameManager {
  constructor() {
    this._mouse = new Mouse();
    this._keys = new Keyboard();

    this._pointerLockManager = new PointerLockApiManager({
      blocker: document.body.querySelector('.blocker'),
      instructions: document.body.querySelector('.instructions')
    }, this._keys, this._mouse);

    this._gameScene = new GameScene(
      camera => this._pointerLockManager.getPointerLock(camera),
      this._keys,
      this._mouse
    );
  }

  startGame() {
    this._gameScene.start();
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
