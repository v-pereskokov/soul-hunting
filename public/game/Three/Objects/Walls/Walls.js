import threeFactory from '../../ThreeFactory/ThreeFactory';
import Objects from '../Objects/Objects';
import textureLoader from '../../../Services/LoaderService/LoaderService';

export default class Walls extends Objects {
  constructor(color = 1, ...settings) {
    super();

    this._color = color;

    this._materials = [
      textureLoader.load('/game/images/wall-1.jpg'),
      textureLoader.load('/game/images/wall-2.jpg'),
      0xFBEBCD
    ];

    this._initGeometry(settings);
  }

  _setGeometry(settings) {
    this._geometry = threeFactory.cubeGeometry(...settings);
  }

  _setMaterial() {
    this._material = threeFactory.meshBasicMaterial({
      map: this._materials[this._color]
    });
  }
}
