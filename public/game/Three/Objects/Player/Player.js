import threeFactory from '../../ThreeFactory/ThreeFactory';
import Objects from '../Objects/Objects';
import textureLoader from '../../../Services/LoaderService/LoaderService';

export default class Player extends Objects {
  constructor() {
    super();

    this._initGeometry();
  }

  _setGeometry(settings) {
    this._geometry = threeFactory.cubeGeometry(40, 40, 40);
  }

  _setMaterial() {
    this._material = threeFactory.meshBasicMaterial({
      map: textureLoader.load('/static/gameSource/face1.png')
    });
  }
}
