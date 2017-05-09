import threeFactory from '../Three/ThreeFactory/ThreeFactory';
import ControlsManager from "../Manager/ControlsManager/ControlsManager";
import Camera from "../Three/Objects/Camera/Camera";
import Floor from "../Three/Objects/Floor/Floor";
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
  constructor(pointerLock, keys, mouse) {
    this._pointerLock = pointerLock;
    this._keys = keys;
    this._mouse = mouse;

    this._isAnimate = true;

    this._previousTime = performance.now();
    this._raycaster = threeFactory
      .raycaster(threeFactory.vector3D(),
        threeFactory.vector3D(0, -1, 0), 0, 10);
  }

  start() {
    this._init();
    this._animate();
  }

  _init() {
    this._setUpClock();
    this._setUpScene();
    this._setUpFog();
    this._setUpCamera();
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

    // this._scene.add(this._camera);
  }

  _setUpControls() {
    this._dopControls = this._pointerLock(this._camera);
    this._dopControls.setMouseMove(
      this._mouse.onMouseMove(
        this._camera,
        this._dopControls.getObject
      )
    );

    this._scene.add(this._dopControls.getObject);

    this._controls = new ControlsManager(this._camera);
    this._controls.setEvents(this._createBullet.bind(this));
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
    this._setUpFloor(map.width * UNITSIZE);

    this._setUpWalls();

    this._setUpLight(0x000000, 0.7, 0.5, 1, 0.5);
    this._setUpLight(0x000000, 0.5, -0.5, -1, -0.5);
  }

  _setUpFloor(size) {
    this._scene.add(new Floor(size).object);
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
    for (let i = 0; i < 5; i++) {
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
    this._controls.update(delta, Helper.checkWallCollision.bind(this), this._dopControls.getObject);

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
      this._isAnimate = false;
      document.body.querySelector('.wrapper__game').style.display = 'none';
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

  update() {
    if (this._keys.getEnabled) {
      this._raycaster.ray.origin.copy(this._dopControls.getObject.position);
      this._raycaster.ray.origin.y -= 10;

      const time = performance.now();

      this._newAction(time, (time - this._previousTime) / 1000);
    }
  }

  _newAction(time, delta, isInObject) {
    this._keys.x -= this._keys.x * 10.0 * delta;
    this._keys.z -= this._keys.z * 10.0 * delta;

    this._keys.y -= 9.8 * 100.0 * delta;

    const speed = 1500.0;


    if (this._keys._forward) {
      this._keys.z -= speed * delta;
      if (Helper.checkWallCollision({
          x: this._keys.x,
          z: this._keys.z
        })) {
        this._keys.z += speed * delta;
      }
    }
    if (this._keys._backward) {
      this._keys.z += speed * delta;
      if (Helper.checkWallCollision({
          x: this._keys.x,
          z: this._keys.z
        })) {
        this._keys.z -= speed * delta;
      }
    }

    if (this._keys._left) {
      this._keys.x -= speed * delta;
      if (Helper.checkWallCollision({
          x: this._keys.x,
          z: this._keys.z
        })) {
        this._keys.x += speed * delta;
      }
    }
    if (this._keys._right) {
      this._keys.x += speed * delta;
      if (Helper.checkWallCollision({
          x: this._keys.x,
          z: this._keys.z
        })) {
        this._keys.x -= speed * delta;
      }
    }

    this._keys.y = Math.max(0, this._keys.y);

    this._dopControls.getObject.translateX(this._keys.x * delta);
    this._dopControls.getObject.translateY(this._keys.y * delta);
    this._dopControls.getObject.translateZ(this._keys.z * delta);

    if (this._dopControls.getObject.position.y < 10) {

      this._keys.y = 0;
      this._dopControls.getObject.position.y = 10;

      this._keys._jump = true;
    }

    this._previousTime = time;
  }
}
