import Mouse from "../../Controls/Mouse/Mouse";
import Keyboard from "../../Controls/Keyboard/Keyboard";
import { MOVESPEED } from '../../Constants/Constants';

export default class ControlsManager {
  constructor(camera) {
    this.camera = camera;
    this.mouse = new Mouse();
    this.keyboard = new Keyboard();
  }

  setEvents(onClickCallback = null) {
    document.addEventListener('contextmenu', event => {
      event.preventDefault();
    });

    document.addEventListener('click', this.mouse.onClickMouse(onClickCallback));
  }

  update(delta, checkCollision) {
    const actualMoveSpeed = delta * MOVESPEED;

    if (this.keyboard.forward) {
      this.camera.translateZ(-(actualMoveSpeed));
      if (checkCollision(this.camera.position)) {
        this.camera.translateZ(actualMoveSpeed);
      }
    }
    if (this.keyboard.backward) {
      this.camera.translateZ(actualMoveSpeed);
      if (checkCollision(this.camera.position)) {
        this.camera.translateZ(-actualMoveSpeed);
      }
    }

    if (this.keyboard.left) {
      this.camera.translateX(-actualMoveSpeed);
      if (checkCollision(this.camera.position)) {
        this.camera.translateX(actualMoveSpeed);
      }
    }
    if (this.keyboard.right) {
      this.camera.translateX(actualMoveSpeed);
      if (checkCollision(this.camera.position)) {
        this.camera.translateX(-actualMoveSpeed);
      }
    }
  }
}