import Game from "../Game/Game";
import Mouse from "../../Controls/Mouse/Mouse";
import Keyboard from "../../Controls/Keyboard/Keyboard";
import PointerLockApiManager from "../../Manager/PointerLockApiManager/PointerLockApiManager";
import musicService from '../../Tools/MusicService/MusicService';
import countNumbers from '../../Tools/CountNumbers/CountNumbers';
import SinglePlayerScene from "../../Scenes/SinglePlayerScene/SinglePlayerScene";

export default class SinglePlayer extends Game {
  constructor(functionGo) {
    super();

    this._keys = new Keyboard();
    this._mouse = new Mouse();

    this.startPreview(functionGo);
  }

  start(stopMusic, functionGo) {
    this._gameScene = this._getScene(functionGo);
    this._pointerLockManager = this._getPointerLock(stopMusic, functionGo);

    this._gameScene.setPointerLock(
      (camera) => this._pointerLockManager.getPointerLock(camera)
    );
  }

  startPreview(functionGo) {
    this._togglePreloader(true);
    musicService.startBackgroundSingle();

    setTimeout(() => {
      this._togglePreloader(false);
      this._setInstructions();
      this.start(() => {
        musicService.stopBackground();
      }, functionGo);
    }, 3000);
  }

  _setInstructions() {
    document.body.querySelector('.instructions').style.cursor = 'pointer';
  }

  _togglePreloader(type) {
    document.body.querySelector('.pre-loader__wrapper').style.display = type ? 'block' : 'none';
  }

  _getScene(functionGo) {
    return new SinglePlayerScene(
      this._keys,
      this._mouse,
      functionGo
    );
  }

  _getPointerLock(stopMusic, functionGo) {
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
          this._gameScene._animate();

          setTimeout(() => {
            this._gameScene.stop();
          }, 25);

          document.body.querySelector('.wrapper__game').style.display = 'block';

          this._beforeStart();
        } else {
          stopMusic();
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
