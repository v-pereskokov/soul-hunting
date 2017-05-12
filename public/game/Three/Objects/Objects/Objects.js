import threeFactory from '../../ThreeFactory/ThreeFactory';

export default class Objects {
  constructor() {
    this._geometry = null;
    this._material = null;
  }

  get object() {
    return threeFactory.mesh(this._geometry, this._material);
  }

  _initGeometry(...settings) {
    this._setGeometry(...settings);
    this._setMaterial();
  }

  _setGeometry() {

  }

  _setMaterial() {

  }
}