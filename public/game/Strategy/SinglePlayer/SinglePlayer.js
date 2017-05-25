import Game from '../Game/Game';
import SinglePlayerScene from '../../Scenes/SinglePlayerScene/SinglePlayerScene';

export default class SinglePlayer extends Game {
  constructor(functionGo) {
    super(functionGo);
  }

  _getScene(functionGo) {
    return new SinglePlayerScene(
      this._keys,
      this._mouse,
      functionGo
    );
  }
}
