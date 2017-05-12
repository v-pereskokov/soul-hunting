import threeFactory from '../../ThreeFactory/ThreeFactory';
import Objects from '../Objects/Objects';

export default class Bullet extends Objects {
  constructor() {
    super();

    this._initGeometry();
  }

  _setGeometry(settings) {
    this._geometry = threeFactory.sphereGeometry(3, 6, 6);
  }

  _setMaterial() {
    this._material = threeFactory.meshBasicMaterial({
      opacity: 0,
      transparent: true,
      color: 0x333333
    });
  }
}
