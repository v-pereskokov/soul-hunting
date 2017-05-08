class BulletsService {
  constructor() {
    this._bullets = [];
  }

  add(bullet) {
    this._bullets.push(bullet);
  }

  getBullet(index) {
    return this._bullets[index];
  }

  remove(index) {
    this._bullets.splice(index, 1);
  }

  get count() {
    return this._bullets.length;
  }

  get all() {
    return this._bullets;
  }
}

const bulletsService = new BulletsService();

export default bulletsService;
