import AimManager from '../../Manager/AimManager/AimManager';
import gameAudioManager from '../../Manager/GameAudioManager/GameAudioManager';
import SpriteManager from '../../Manager/SpriteManager/SpriteManager';

export default class Mouse {
  constructor() {
    this._x = 0;
    this._y = 0;

    this._enabled = false;
    this._aim = new AimManager();

    this._shootAnimate = new SpriteManager();
  }

  setEvents(onClickCallback) {
    document.addEventListener('contextmenu', event => {
      event.preventDefault();
    });

    document.addEventListener('mousedown', this.onMouseDown(onClickCallback));
  }

  set setEnabled(enabled) {
    this._enabled = enabled;
  }

  onMouseMove(camera) {
    return event => {
      if (this._enabled) {
        this._x = event.movementX ||
          event.mozMovementX ||
          event.webkitMovementX ||
          0;

        camera.rotation.y -= this._x * 0.002;
      }
    };
  }

  onMouseDown(callback) {
    return event => {
      event.preventDefault();

      if (this._shootAnimate) {
        this._shootAnimate.stop();
      }

      this._shootAnimate = new SpriteManager();
      this._shootAnimate.start();

      const sound = gameAudioManager.getSound('shoot');

      if (this._enabled && event.which === 1) {
        this._aim.start();

        if (sound) {
          sound.play();
        }

        setTimeout(() => {
          this._shootAnimate.stop();
        }, 900);

        setTimeout(() => {
          if (sound.isPlaying) {
            sound.stop();
          }
        }, 300);

        callback();
      }
    }
  }
}
