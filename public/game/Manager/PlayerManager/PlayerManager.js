export default class PlayerService {
  constructor(playerObject, health) {
    this._playerObject = playerObject;
    this._health = health;
    this._kills = 0;
    this._id = -1;

    this._lastRandomX = Math.random();
    this._lastRandomZ = Math.random();

    this._isAngry = false;

    this._lastShot = Date.now();
  }

  set health(health) {
    this._health = health;
  }

  set kills(kills) {
    this._kills = kills;
  }

  set id(id) {
    this._id = id;
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

  set isAngry(value) {
    this._isAngry = value;
  }

  get health() {
    return this._health;
  }

  get kills() {
    return this._kills;
  }

  get id() {
    return this._id;
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

  get isAngry() {
    return this._isAngry;
  }

  translateX(speed) {
    this._playerObject.translateX(speed);
  }

  translateZ(speed) {
    this._playerObject.translateZ(speed);
  }
}
