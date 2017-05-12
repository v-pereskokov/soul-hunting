import threeFactory from '../../Three/ThreeFactory/ThreeFactory';

class LoaderService {
  constructor() {
    this._loader = threeFactory.textureLoader();
  }

  load(texture) {
    return this._loader.load(texture);
  }
}

const textureLoader = new LoaderService();

export default textureLoader;
