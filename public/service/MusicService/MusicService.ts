import Music from '../../tools/Music/Music';

class MusicService {
  private _background: any;

  constructor() {
    this._background = new Music('../../static/sounds/background.wav');
    this._setKeysMute();
  }

  public startBackground() {
    this._background.loopPlay();
  }

  public stopBackground() {
    this._background.stop();
  }

  private _setKeysMute() {
    document.addEventListener('keydown', (event: any) => {
      if (event.altKey && event.keyCode === 77) {
        this._background.muteToggle();
      }
    });
  }
}

const musicService = new MusicService();

export default musicService;
