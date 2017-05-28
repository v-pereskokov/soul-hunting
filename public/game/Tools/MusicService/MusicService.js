import Music from '../Music/Music';

class MusicService {
  constructor() {
    this._beforeStart = new Music('../../../static/sounds/start_game.wav');
    this._end = new Music('../../../static/sounds/end.wav');
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
