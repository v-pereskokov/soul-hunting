import threeFactory from '../../Three/ThreeFactory/ThreeFactory';

export default class PointerLock {
  constructor(camera) {
    this._camera = camera;

    this._defaultCamera();
    this._setPitch();
    this._setYaw();
  }

  setMouseMove(mouseMoveCallback) {
    this._addEvent(mouseMoveCallback);
  }

  get getObject() {
    return this._yaw;
  }

  get getPitch() {
    return this._pitch;
  }

  getDirection() {
    const direction = threeFactory.vector3D(0, 0, -1);
    const rotation = threeFactory.euler('YXZ', 0, 0, 0);

    return (visual) => {
      rotation.set(this._pitch.rotation.x, this._yaw.rotation.y, 0);
      visual.copy(direction).applyEuler(rotation);

      return visual;
    };
  }

  _defaultCamera() {
    this._camera.rotation.set(0, 0, 0);
  }

  _setPitch() {
    this._pitch = threeFactory.object3D();
    this._pitch.add(this._camera);
  }

  _setYaw() {
    this._yaw = threeFactory.object3D();

    this._yaw.position.y = 10;
    this._yaw.add(this._pitch);
  }

  _addEvent(mouseMoveCallback) {
    document.addEventListener('mousemove', mouseMoveCallback);
  }

  _removeEvent(mouseMoveCallback) {
    document.addEventListener('mousemove', mouseMoveCallback);
  }
}
