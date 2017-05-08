export default class PlayerService {
  constructor(playerObject, health) {
    this._playerObject = playerObject;
    this._health = health;
    this._kills = 0;

    this._lastRandomX = Math.random();
    this._lastRandomZ = Math.random();

    this._lastShot = Date.now();
  }

  set health(health) {
    this._health = health;
  }

  set kills(kills) {
    this._kills = kills;
  }

  set x(x) {
    this._lastRandomX = x;
  }

  set z(z) {
    this._lastRandomZ = z;
  }

  set lastShot(date) {
    this._lastShot = date;
  }

  get health() {
    return this._health;
  }

  get kills() {
    return this._kills;
  }

  get x() {
    return this._lastRandomX;
  }

  get z() {
    return this._lastRandomZ;
  }

  get object() {
    return this._playerObject;
  }

  get lastShot() {
    return this._lastShot;
  }

  translateX(speed) {
    this._playerObject.translateX(speed);
  }

  translateZ(speed) {
    this._playerObject.translateZ(speed);
  }
}
