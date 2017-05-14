import threeFactory from '../../Three/ThreeFactory/ThreeFactory';
import Camera from "../../Three/Objects/Camera/Camera";
import Floor from "../../Three/Objects/Floor/Floor";
import Ceil from "../../Three/Objects/Ceil/Ceil";
import Walls from "../../Three/Objects/Walls/Walls";
import Bullet from "../../Three/Objects/Bullet/Bullet";
import BulletService from '../../Manager/BulletManager/BulletManager';
import bulletsService from '../../Manager/BulletsManager/BulletsManager';
import map from '../../Tools/Map/Map';
import Helper from "../../Tools/Helper/Helper";
import CollisionService from "../../Manager/CollisionManager/CollisionManager";
import gameAudioManager from '../../Manager/GameAudioManager/GameAudioManager';
import {
  WIDTH,
  HEIGHT,
  UNITSIZE,
  WALLHEIGHT,
} from '../../Constants/Constants';

export default class BaseScene {
  constructor(keys, mouse, functionGo) {
    this._pointerLock = null;

    this._keys = keys;
    this._mouse = mouse;

    this._isAnimate = true;

    this._goToFromGame = functionGo;

    this._setDesign();
  }

  setPointerLock(pointerLock) {
    this._pointerLock = pointerLock;
  }

  start() {
    this._init();
    this._animate();
  }

  resume() {
    this._isAnimate = true;
  }

  stop() {
    this._isAnimate = false;
  }

  _initScenePreferences() {
    this._setUpClock();
    this._setUpScene();
    this._setUpFog();
    this._setUpCamera();
    this._setUpPointerLock();
    this._setUpAudio();
  }

  _init() {
    this._initScenePreferences();

    this._makeScene();

    this._setUpRender();
  }

  _animate() {
    if (this._isAnimate) {
      requestAnimationFrame(this._animate.bind(this));
    }

    this._render();
  }

  _setUpClock() {
    this._clock = threeFactory.clock();
  }

  _setUpScene() {
    this._scene = threeFactory.scene();
  }

  _setUpFog() {
    this._scene.fog = threeFactory.fogExp2(0x000000, 0.0005);
  }

  _setUpCamera() {
    this._camera = new Camera({
      getHeight: UNITSIZE * 0.2
    }).getCamera;
  }

  _setUpAudio() {
    this._listenerAudio = threeFactory.audioListener();
    this._camera.add(this._listenerAudio);

    gameAudioManager.instance(this._listenerAudio);
  }

  _setUpPointerLock() {
    this._mouse.setEvents(this._createBullet.bind(this));

    this._mouseControls = this._pointerLock(this._camera);
    this._mouseControls.setMouseMove(
      this._mouse.onMouseMove(this._camera)
    );

    this._scene.add(this._mouseControls.getObject);
  }

  _setUpRender() {
    this._renderer = threeFactory.webGLRender();
    this._renderer.setClearColor(0xC0C0A1);
    this._renderer.setSize(WIDTH, HEIGHT);

    document.body
      .querySelector('.wrapper__game')
      .appendChild(this._renderer.domElement);

    window.addEventListener('resize', (event) => {
      event.preventDefault();

      this._resize();
    });
  }

  _resize() {
    this._camera.aspect = window.innerWidth / window.innerHeight;
    this._camera.updateProjectionMatrix();

    this._renderer.setSize(window.innerWidth, window.innerHeight);
  }

  _makeScene() {
    const height = map.width * UNITSIZE;

    this._setUpFloor(height);
    this._setUpCeil(height);

    this._setUpWalls();

    this._setUpLight(0x000000, 0.7, 0.5, 1, 0.5);
    this._setUpLight(0x000000, 0.5, -0.5, -1, -0.5);
  }

  _setUpFloor(size) {
    this._scene.add(new Floor(size).object);
  }

  _setUpCeil(size) {
    const ceil = new Ceil(size).object;

    ceil.position.y = 130;
    this._scene.add(ceil);
  }

  _setUpWalls() {
    for (let i = 0; i < map.width; i++) {
      for (let j = 0, m = map.getLine(i).length; j < m; j++) {
        if (map.getField(i, j)) {
          const wall = new Walls(map.getField(i, j) - 1, UNITSIZE, WALLHEIGHT, UNITSIZE).object;

          wall.position.x = (i - map.width / 2) * UNITSIZE;
          wall.position.y = WALLHEIGHT / 2;
          wall.position.z = (j - map.width / 2) * UNITSIZE;

          this._scene.add(wall);
        }
      }
    }
  }

  _setUpLight(hex, intensity, x, y, z) {
    const directionalLight = threeFactory.directionalLight(hex, intensity);
    directionalLight.position.set(x, y, z);

    this._scene.add(directionalLight);
  }

  _updateBullets(delta) {
    for (let i in bulletsService.all) {
      const bullet = bulletsService.getBullet(i);
      const position = bullet.object.position;

      if (CollisionService.collisionBulletWithWall(position)) {
        bulletsService.remove(i);
        this._scene.remove(bullet.object);
      }
    }
  }

  _render() {
    const delta = this._clock.getDelta();
    this._keys.update(this._camera, delta, Helper.checkWallCollision.bind(this));

    // Update bullets.
    this._updateBullets(delta);

    this._renderer.render(this._scene, this._camera);

    // Death
    this._death();
  }

  _death() {
  }

  _createBullet(object) {
    if (object === undefined) {
      object = this._camera;
    }

    const bullet = new BulletService(new Bullet().object, object, this._camera);

    bulletsService.add(bullet);
    this._scene.add(bullet.object);
  }

  _setDesign() {
    this._end = document.body.querySelector('.end');
    this._endTitles = document.body.querySelector('.endGameTheme__wrapper');
    this._type = this._endTitles.querySelector('.endGameTheme__wrapper-type');
    this._gameOver = this._endTitles.querySelector('.endGameTheme__wrapper-gameOver');
    this._table = document.body.querySelector('.gameTable__wrapper');
  }
}
