import Music from '../Music/Music';

class MusicService {
  constructor() {
    this._background = new Music('../../../static/sounds/background.wav');
    this._beforeStart = new Music('../../../static/sounds/start_game.wav');
    this._setKeysMute();
  }

  startBackground() {
    this._background.loopPlay();
  }

  stopBackground() {
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
    this._beforeStart.loopPlay();
  }

  stopBeforeGame() {
    this._beforeStart.stop();
  }
}

const musicService = new MusicService();

export default musicService;
