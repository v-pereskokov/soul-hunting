import AimManager from '../../Manager/AimManager/AimManager';
import gameAudioManager from '../../Manager/GameAudioManager/GameAudioManager';

export default class Mouse {
  constructor() {
    this._x = 0;
    this._y = 0;

    this._enabled = false;
    this._aim = new AimManager();

    this._shootAnimate = document.body.querySelector('.shooterAnimation');
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
        console.log(camera.rotation.y);
      }
    };
  }

  onMouseDown(callback) {
    return event => {
      event.preventDefault();

      this._shootAnimate.style.display = 'block';
      this._shootAnimate.style.display = 'block';

      const sound = gameAudioManager.getSound('shoot');

      if (this._enabled && event.which === 1) {
        this._aim.start();

        if (sound && !sound.isPlaying) {
          sound.play();
        }

        setTimeout(() => {
          this._shootAnimate.style.display = 'none';
        }, 100);

        callback();
      }
    }
  }
}
