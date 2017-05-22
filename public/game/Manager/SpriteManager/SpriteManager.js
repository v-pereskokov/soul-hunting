import Sprite from '../../Tools/Sprite/Sprite';

export default class SpriteManager {
  constructor() {
    this._createObjectImage();
    this._createCanvas();

    console.log(this._canvas);
    console.log(this._objectImage);

    this._object = new Sprite(
      this._canvas.getContext('2d'),
      5,
      13,
      100,
      100,
      this._objectImage
    );
  }

  loop() {
    requestAnimationFrame(this.loop.bind(this));

    this._object.update();
    this._object.render();
  }

  _createCanvas() {
    this._canvas = document.querySelector('.shooterAnimation');
    this._canvas.width = 38;
    this._canvas.height = 40;
  }

  _createObjectImage() {
    this._objectImage = new Image();

    this._objectImage.addEventListener('load', this.loop.bind(this));
    this._objectImage.src = '/static/gameSource/shoot.png';
  }
}