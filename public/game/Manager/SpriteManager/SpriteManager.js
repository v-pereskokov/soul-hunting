import Sprite from '../../Tools/Sprite/Sprite';

export default class SpriteManager {
  constructor() {
    this._isStop = false;

    this._createObjectImage();
    this._createCanvas();

    this._object = new Sprite(
      this._canvas.getContext('2d'),
      5,
      13,
      1000,
      100,
      this._objectImage
    );
  }

  loop() {
    if (!this._isStop) {
      requestAnimationFrame(this.loop.bind(this));
    }

    this._object.update();
    this._object.render();
  }

  start() {
    this._isStop = false;
    this._object.reset();
    this.loop();
  }

  stop() {
    this._isStop = true;
    this.loop();
    this._object.clear();
  }

  _createCanvas() {
    this._canvas = document.querySelector('.shooterAnimation');
    this._canvas.width = 38;
    this._canvas.height = 40;
  }

  _createObjectImage() {
    this._objectImage = new Image();

    this._objectImage.addEventListener('load', () => console.log('sprite load'));
    this._objectImage.src = '/static/gameSource/shoot.png';
  }
}