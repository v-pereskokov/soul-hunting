import threeFactory from '../../Three/ThreeFactory/ThreeFactory';

export default class BulletService {
  constructor(bulletObject, owner, camera) {
    this._bulletObject = bulletObject;
    this._owner = owner;

    this._createBullet(camera);
  }

  _createBullet(camera) {
    this._bulletObject.position.set(
      this._owner.position.x,
      this._owner.position.y * 0.8,
      this._owner.position.z
    );

    this._bulletObject.ray = threeFactory.ray(
      this._owner.position,
      this._getVectorBullet(camera).sub(this._owner.position).normalize()
    );
  }

  _getVectorBullet(camera) {
    let vector = null;

    if (this._owner instanceof threeFactory._three.Camera) {
      vector = threeFactory.vector3D(0, 0, 1);
      vector.unproject(this._owner);
    }
    else {
      vector = camera.position.clone();
    }

    return vector;
  }

  get owner() {
    return this._owner;
  }

  get object() {
    return this._bulletObject;
  }
}
