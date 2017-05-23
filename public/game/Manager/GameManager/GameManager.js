import {MULTIPLAYER, SINGLEPLAYER} from "../../Constants/Types";
import SinglePlayer from "../../Strategy/SinglePlayer/SinglePlayer";

export default class GameManager {
  constructor(type, functionGo) {
    this._startGame(type, functionGo);
  }

  _startGame(type, functionGo) {
    switch (type) {
      case SINGLEPLAYER:
        return new SinglePlayer(functionGo);
      case MULTIPLAYER:
        return 'soon';
      default:
        return null;
    }
  }
}
