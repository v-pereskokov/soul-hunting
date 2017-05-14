import threeFactory from '../../Three/ThreeFactory/ThreeFactory';
import {MOVING, SHOOT, PAIN, HIT} from "../../Constants/Audio";

class GameAudioManager {
  constructor() {
    this._sounds = {};
    this._loader = threeFactory.audioLoader();
  }

  instance(listener) {
    this._listener = listener;

    this._initAudio();
  }

  getSound(name) {
    return this._sounds[name];
  }

  _initAudio() {
    this._load(MOVING);
    this._load(SHOOT);
    this._load(PAIN);
    this._load(HIT);
  }

  _load(path) {
    this._loader.load(path, buffer => {
      let key = path.substr(26, path.length - 30);

      this._sounds[key] = threeFactory.audio(this._listener);
      this._sounds[key].setBuffer(buffer);
      this._sounds[key].started = false;
    });
  }
}

const gameAudioManager = new GameAudioManager();

export default gameAudioManager;
