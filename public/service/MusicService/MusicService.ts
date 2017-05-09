import Music from '../../tools/Music/Music';

class MusicService {
  constructor() {
    this._background = new Music('../../static/sounds/background.wav');
  }

  startBackground() {
    console.log(this._background._getObject().currentTime);
    this._background.loopPlay();
  }

  stopBackground() {
    this._background.stop();
  }
}

const musicService = new MusicService();

export default musicService;
