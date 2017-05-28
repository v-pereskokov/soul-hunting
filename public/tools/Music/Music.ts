export default class Music {
  private _music?: any;
  private _isMute: boolean;

  constructor(path: string = '') {
    this._music = path ? new Audio(path) : null;
    this._isMute = false;
  }

  public play() {
    this._music.play();
  }

  public loopPlay() {
    if (this._music) {
      this._music.addEventListener('ended', () => {
        this._music.currentTime = 0;
        this.play();
      }, false);
      this.play();
    }
  }

  public stop() {
    this._music.pause();
    this._music.currentTime = 0;
  }

  public muteToggle() {
    this._music.volume = this._isMute ? 1.0 : 0.0;
    this._isMute = !this._isMute;
  }

  public _getObject() {
    return this._music;
  }
}
