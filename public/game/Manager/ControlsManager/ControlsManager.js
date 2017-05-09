import threeFactory from '../../Three/ThreeFactory/ThreeFactory';
import Mouse from "../../Controls/Mouse/Mouse";
import Keyboard from "../../Controls/Keyboard/Keyboard";
import { MOVESPEED, LOOKSPEED } from '../../Constants/Constants';

export default class ControlsManager {
  constructor(camera) {
    this.camera = camera;
    this.target = threeFactory.vector3D(0, 0, 0);

    this.mouse = new Mouse();
    this.keyboard = new Keyboard();

    this.movementSpeed = 200;
    this.lookSpeed = 0.075;

    this.heightSpeed = false;
    this.heightMin = 0.0;

    this.constrainVertical = true;
    this.verticalMin = 0;
    this.verticalMax = Math.PI;

    this.autoSpeedFactor = 0.0;

    this.lat = 0;
    this.lon = 0;
    this.phi = 0;
    this.theta = 0;

  }

  setEvents(onClickCallback = null, onMoveCallback = null) {
    document.addEventListener('contextmenu', event => {
      event.preventDefault();
    });

    document.addEventListener('click', this.mouse.onClickMouse(onClickCallback));
    // document.addEventListener('mousemove', this.mouse.onMouseMove1());
  }

  update(delta, checkCollision, dop) {
    // if (this.heightSpeed) {
    //
    //   const y = threeFactory.clamp(
    //     this.camera.position.y,
    //     this.heightMin,
    //     this.heightMax
    //   );
    //   const heightDelta = y - this.heightMin;
    //
    //   this.autoSpeedFactor = delta * heightDelta;
    // } else {
    //   this.autoSpeedFactor = 0.0;
    // }

    const actualMoveSpeed = delta * MOVESPEED;

    if (this.keyboard.forward) {
      this.camera.translateZ(-(actualMoveSpeed + this.autoSpeedFactor));
      if (checkCollision(this.camera.position)) {
        this.camera.translateZ(actualMoveSpeed + this.autoSpeedFactor);
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

    // const targetPosition = this.target;
    // const position = this.camera.position;
    // const lookSpeed = delta * LOOKSPEED;
    //
    // this._changeAngles(lookSpeed);
    // this._changeTarget(targetPosition, position);
    //
    // this._changeAngles(lookSpeed);
    // this._changeTarget(targetPosition, position);
    //
    // this.camera.lookAt(targetPosition);
  }

  _changeTarget(targetPosition, cameraPosition) {
    targetPosition.x = cameraPosition.x + 100 * Math.sin(this.phi) * Math.cos(this.theta);
    targetPosition.y = cameraPosition.y + 100 * Math.cos(this.phi);
    targetPosition.z = cameraPosition.z + 100 * Math.sin(this.phi) * Math.sin(this.theta);
  }

  _changeAngles(lookSpeed) {
    this.lon += this.mouse.mouseX * lookSpeed;
    this.lat = Math.max(-85, Math.min(85, this.lat));
    this.phi = ( 90 - this.lat ) * Math.PI / 180;
    this.theta = this.lon * Math.PI / 180;
  }
}