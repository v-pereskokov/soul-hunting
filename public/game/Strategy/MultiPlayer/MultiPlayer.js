import Game from '../Game/Game';
import MultiPlayerScene from '../../Scenes/MultiPlayerScene/MultiPlayerScene';

export default class MultiPlayer extends Game {
  constructor(functionGo) {
    super(functionGo, true);
  }

  _getScene(functionGo, webSocket) {
    return new MultiPlayerScene(
      this._keys,
      this._mouse,
      webSocket,
      functionGo
    );
  }
}
