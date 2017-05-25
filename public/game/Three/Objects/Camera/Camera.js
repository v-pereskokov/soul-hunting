import threeFactory from '../../ThreeFactory/ThreeFactory';
import Helper from '../../../Tools/Helper/Helper';
import {UNITSIZE} from '../../../Constants/Constants';
import map from '../../../Tools/Map/Map';

export default class Camera {
  constructor(player) {
    this._init(player);
  }

  get getCamera() {
    return this._camera;
  }

  _init(player) {
    this._camera = threeFactory
      .perspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);

    let [x, z] = Helper.getRandomPosition();
    while (map._map[x][z] > 0) {
      [x, z] = Helper.getRandomPosition();
    }

    x = Math.floor(x - map.width / 2) * UNITSIZE;
    z = Math.floor(z - map.width / 2) * UNITSIZE;
    
    this._camera.position.set(x, player.getHeight, z);
    this._camera.lookAt(threeFactory.vector3D(0, player.getHeight, 0));
  }
}
