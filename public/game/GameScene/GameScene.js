import threeFactory from '../Three/ThreeFactory/ThreeFactory';
import ControlsManager from "../Manager/ControlsManager/ControlsManager";
import Camera from "../Three/Objects/Camera/Camera";
import Floor from "../Three/Objects/Floor/Floor";
import Ceil from "../Three/Objects/Ceil/Ceil";
import Walls from "../Three/Objects/Walls/Walls";
import Player from "../Three/Objects/Player/Player";
import Bullet from "../Three/Objects/Bullet/Bullet";
import PlayerService from '../Manager/PlayerManager/PlayerManager';
import playersService from '../Manager/PlayersManager/PlayersManager';
import BulletService from '../Manager/BulletManager/BulletManager';
import bulletsService from '../Manager/BulletsManager/BulletsManager';
import playerStats from '../Tools/PlayerStats/PlayerStats';
import map from '../Tools/Map/Map';
import Helper from "../Tools/Helper/Helper";
import CollisionService from "../Manager/CollisionManager/CollisionManager";
import AIService from '../Manager/AIManager/AIManager';
import {
  WIDTH,
  HEIGHT,
  UNITSIZE,
  WALLHEIGHT,
  MOVESPEEDAI,
  BULLETMOVESPEED
} from '../Constants/Constants';

export default class GameScene {
  constructor(keys, mouse) {
    this._pointerLock = null;
    this._keys = keys;
    this._mouse = mouse;

    this._isAnimate = true;
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

  _init() {
    this._setUpClock();
    this._setUpScene();
    this._setUpFog();
    this._setUpCamera();
    this._setUpPointerLock();
    this._setUpControls();

    this._makeScene();
    this._setUpAI();

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

  _setUpPointerLock() {
    this._mouse.setEvents(this._createBullet.bind(this));

    this._mouseControls = this._pointerLock(this._camera);
    this._mouseControls.setMouseMove(
      this._mouse.onMouseMove(this._camera)
    );

    this._scene.add(this._mouseControls.getObject);
  }

  _setUpControls() {
    this._controls = new ControlsManager(this._camera);
  }

  _setUpRender() {
    this._renderer = threeFactory.webGLRender();
    this._renderer.setClearColor(0xC0C0A1);
    this._renderer.setSize(WIDTH, HEIGHT);

    document.body
      .querySelector('.wrapper__game')
      .appendChild(this._renderer.domElement);

    window.addEventListener('resize', this._resize.bind(this), false);
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

  _setUpAI() {
    for (let i = 0; i < 6; i++) {
      this._addAI();
    }
  }

  _addAI() {
    const position = Helper.getMapSector(this._camera.position);

    let [x, z] = Helper.getRandomPosition();
    while (map.getField(x, z) > 0 || (x === position.x && z === position.z)) {
      [x, z] = Helper.getRandomPosition();
    }

    x = Math.floor(x - map.width / 2) * UNITSIZE;
    z = Math.floor(z - map.width / 2) * UNITSIZE;

    const playerObject = new Player().object;
    playerObject.position.set(x, UNITSIZE * 0.15, z);

    playersService.add(new PlayerService(playerObject, 100));
    this._scene.add(playerObject);
  }

  _updateBullets(delta) {
    for (let i in bulletsService.all) {
      const bullet = bulletsService.getBullet(i);
      const position = bullet.object.position;

      if (CollisionService.collisionBulletWithWall(position)) {
        bulletsService.remove(i);
        this._scene.remove(bullet.object);

        continue;
      }

      // Collide with AI
      let hit = CollisionService.collisionBulletWithAi(
        this._scene,
        playersService,
        bulletsService,
        bullet,
        position,
        i
      );

      // Bullet hits player
      CollisionService.collisionBulletWithPlayer(
        this._scene,
        playerStats,
        bulletsService,
        position,
        this._camera,
        bullet,
        i
      );

      if (!hit) {
        const speed = delta * BULLETMOVESPEED;
        const direction = bullet.object.ray.direction;

        bullet.object.translateX(speed * direction.x);
        bullet.object.translateZ(speed * direction.z);
      }
    }
  }

  _render() {
    const delta = this._clock.getDelta();
    this._controls.update(delta, Helper.checkWallCollision.bind(this));

    // Update bullets.
    this._updateBullets(delta);

    for (let i in playersService.all) {
      AIService.updateAI(
        this._scene,
        playersService,
        playerStats,
        delta * MOVESPEEDAI,
        i,
        this._addAI.bind(this)
      );

      const player = playersService.getPlayer(i);
      const sector = Helper.getMapSector(player.object.position);

      AIService.shoot(
        this._camera,
        player,
        sector,
        this._createBullet.bind(this)
      );
    }

    this._renderer.render(this._scene, this._camera);

    // Death
    this._death();
  }

  _death() {
    if (playerStats.health <= 0) {
      this.stop();
    }
  }

  _createBullet(object) {
    if (object === undefined) {
      object = this._camera;
    }

    const bullet = new BulletService(new Bullet().object, object, this._camera);

    bulletsService.add(bullet);
    this._scene.add(bullet.object);
  }
}
