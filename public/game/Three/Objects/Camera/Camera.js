import threeFactory from '../../ThreeFactory/ThreeFactory';
import Helper from '../../../Tools/Helper/Helper';

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

    const {x, z} = Helper.randomVector(50);
    
    this._camera.position.set(x, player.getHeight, z);
    this._camera.lookAt(threeFactory.vector3D(0, player.getHeight, 0));
  }
}
