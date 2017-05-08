import threeFactory from '../../ThreeFactory/ThreeFactory';
import Objects from '../Objects/Objects';

export default class Walls extends Objects {
  constructor(color = 1, ...settings) {
    super();

    this._color = color;

    this._materials = [
      0x00CCAA,
      0xC5EDA0,
      0xFBEBCD
    ];

    this._initGeometry(settings);
  }

  _setGeometry(settings) {
    this._geometry = threeFactory.cubeGeometry(...settings);
  }

  _setMaterial() {
    this._material = threeFactory.meshBasicMaterial({
      color: this._materials[this._color]
    });
  }
}
