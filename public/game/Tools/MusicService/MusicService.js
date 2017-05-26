import Music from '../Music/Music';

class MusicService {
  constructor() {
    this._beforeStart = new Music('../../../static/sounds/start_game.wav');
    this._end = new Music('../../../static/sounds/end.wav');

    this._setKeysMute();
  }

  startBackground() {
    this._background.loopPlay();
  }

  startBackgroundSingle() {
    this._background.play();
  }

  stopBackground() {
    this._background.stop();
    this._background.stop();
  }

  _setKeysMute() {
    document.addEventListener('keydown', event => {
      if (event.altKey && event.keyCode === 77) {
        this._background.muteToggle();
      }
    });
  }

  startBeforeGame() {
    this._beforeStart.play();
  }

  stopBeforeGame() {
    this._beforeStart.stop();
  }

  startEndGame() {
    this._end.play();
  }

  stopEndGame() {
    this._end.stop();
  }
}

const musicService = new MusicService();

export default musicService;
