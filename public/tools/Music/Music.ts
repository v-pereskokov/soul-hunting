export default class Music {
  _music?: any;

  constructor(path = null) {
    this._music = path ? new Audio(path) : null;
  }

  play() {
    this._music.play();
  }

  loopPlay() {
    if (this._music) {
      this._music.addEventListener('ended', () => {
        this._music.currentTime = 0;
        this.play();
      }, false);
      this.play();
    }
  }

  stop() {
    this._music.pause();
    this._music.currentTime = 0;
  }

  _getObject() {
    return this._music;
  }
}
