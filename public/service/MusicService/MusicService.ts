import Music from '../../tools/Music/Music';

class MusicService {
  constructor() {
    this._background = new Music('../../static/sounds/background.wav');
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
        console.log('here');

        this._background.muteToggle();
      }
    });
  }
}

const musicService = new MusicService();

export default musicService;
