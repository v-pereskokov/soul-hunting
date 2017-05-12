export default class AimManager {
  constructor() {
    this._aim = document.body.querySelector('.sight');

    this._findSides();
  }

  start() {
    this._shootTop();
    this._shootBottom();
    this._shootRight();
    this._shootLeft();
  }

  _shootTop() {
    this._setNewValueTop(this._top, -5);
    setTimeout(() => this._setNewValueTop(this._top, 0), 200);
  }

  _shootBottom() {
    this._setNewValueTop(this._bottom, 30);
    setTimeout(() => this._setNewValueTop(this._bottom, 25), 200);
  }

  _shootLeft() {
    this._setNewValueLeft(this._left, -5);
    setTimeout(() => this._setNewValueLeft(this._left, 0), 200);
  }

  _shootRight() {
    this._setNewValueLeft(this._right, 30);
    setTimeout(() => this._setNewValueLeft(this._right, 25), 200);
  }

  _setNewValueTop(sight, newValue) {
    sight.style.top = `${newValue}px`;
  }

  _setNewValueLeft(sight, newValue) {
    sight.style.left = `${newValue}px`;
  }

  _findSides() {
    this._top = this._aim.querySelector('.sight__top');
    this._right = this._aim.querySelector('.sight__right');
    this._bottom = this._aim.querySelector('.sight__bottom');
    this._left = this._aim.querySelector('.sight__left');
  }
}
