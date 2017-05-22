export default class Sprite {
  constructor(context, ticksPerSecond, frames,
              width, height, image) {
    this._frameIndex = 0;
    this._tickCount = 0;
    this._context = context;
    this._ticksPerSecond = ticksPerSecond;
    this._frames = frames;
    this._width = width;
    this._height = height;
    this._image = image;
  }

  reset() {
    this._frameIndex = 0;
    this._tickCount = 0;
  }

  update() {
    ++this._tickCount;

    if (this._tickCount > this._ticksPerSecond) {
      this._tickCount = 0;

      this._frameIndex = this._frameIndex < this._frames - 1 ?
        ++this._frameIndex : -1;
    }
  }

  clear() {
    this._context.clearRect(0, 0, this._width, this._height);
  }

  render() {
    this.clear();

    if (this._frameIndex !== -1) {
      this._context.drawImage(
        this._image,
        this._frameIndex * this._width / this._frames,
        0,
        this._width / this._frames,
        this._height,
        -4,
        0,
        this._width / this._frames,
        this._height
      );
    }
  }
}