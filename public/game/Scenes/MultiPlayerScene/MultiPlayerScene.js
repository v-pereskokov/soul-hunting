import BaseScene from '../BaseScene/BaseScene';
import Player from '../../Three/Objects/Player/Player';
import PlayerService from '../../Manager/PlayerManager/PlayerManager';
import playerStats from '../../Tools/PlayerStats/PlayerStats';
import Helper from '../../Tools/Helper/Helper';
import musicService from '../../Tools/MusicService/MusicService';
import GameTableManager from '../../Manager/GameTableManager/GameTableManager';
import gameAudioManager from '../../Manager/GameAudioManager/GameAudioManager';
import textureLoader from '../../Manager/LoaderManager/LoaderManager';
import {
  SNAPSHOT,
  REMOVE_PLAYER,
  END_GAME
} from '../../Constants/MultiPlayer';

export default class MultiPlayerScene extends BaseScene {
  constructor(keys, mouse, gameWebSocketManager, functionGo) {
    super(keys, mouse, functionGo);

    this._game = false;
    this._id = +localStorage.getItem('id');

    this._webSocketManager = gameWebSocketManager;
    this._gameTableManager = new GameTableManager();

    this._isInitLeaderboard = false;
    this._killed = false;

    this._stats.style.display = 'none';
    this._hurt = document.body.querySelector('.hurt');
  }

  set game(value) {
    this._game = value;
  }

  get game() {
    return this._game;
  }

  _init() {
    this._webSocketManager.setOnMessage(this._setUpWebSockets());

    this._findConnectInformation();
    this._setMouseWebSocketHandler();
    this._initScenePreferences();

    this._makeScene();

    this._setUpRender();
  }

  _findConnectInformation() {
    this._connectionInfo = document.body.querySelector('.stats__position-leftDown');
    this._connectionInfoText = this._connectionInfo.getElementsByTagName('p')[0];

    this._hideConnectionInfo();
  }

  _hideConnectionInfo() {
    this._connectionInfo.style.display = 'none';
  }

  _showConnectionInfo(text) {
    this._connectionInfo.style.display = 'block';
    this._connectionInfoText.innerHTML = `${text} connected`;
  }

  _setMouseWebSocketHandler() {
    document.addEventListener('mousedown', (event) => {
      event.preventDefault();

      if (!this._killed && event.which === 1) {
        this._updateBackEnd(true);
      }
    });
  }

  _setUpWebSockets() {
    return (content, data) => {
      console.log(data);

      switch (content.type) {
        case SNAPSHOT:
          this._updateGame(data);
          break;
        case REMOVE_PLAYER:
          this._removePlayer(data);
          break;
        case END_GAME:
          this._endGame();
          break;
        default:
          break;
      }
    };
  }

  _updateGame(data) {
    if (!this._isInitLeaderboard) {
      this._updateTable(this._makeListPlayers(data.players), this._id);
      this._isInitLeaderboard = true;
    }

    if (data.shot) {
      this._showShoot(data.hp);
      this._changeStats(data.hp);
    }

    this._changeStats(data.hp);

    if (data.hp === 0) {
      const {x, y, z} = Helper.randomVector(50);

      this._camera.position.copy({x, y, z});
    }

    data.players.forEach(player => {
      if (player.victims.length > 0) {
        player.victims.forEach(victim => {
          this._setKills(player.login, victim.login);

          setTimeout(() => {
            this._stopStats();
          }, 3000);
        });
      }

      const playerId = player.id;

      if (playerId === this._id) {
        return;
      }

      const playerPosition = player.position;

      if (playerPosition === null) {
        return;
      }

      if (!this._playersService.getFullPlayer(`id${playerId}`)) {
        const playerObject = new Player().object;
        this._playersService.setFullPlayer(playerId, {
          playerObject,
          isAngry: false
        });
        this._playersService.getFullPlayer(`id${playerId}`)
          .playerObject
          .position.copy(playerPosition);

        this._playersService.add(new PlayerService(playerObject, 100));

        this._scene.add(playerObject);

        this._showConnectionInfo(player.login);

        setTimeout(() => {
          this._hideConnectionInfo();
        }, 5000);
      } else {
        const playerStats = this._playersService.getFullPlayer(`id${playerId}`);
        playerStats.playerObject.position.copy(playerPosition);

        const color = playerStats.playerObject.material.color;
        const percent = player.hp / 100;

        if (!playerStats.isAngry && percent < 1) {
          playerStats.playerObject.material.map = textureLoader.load('/static/gameSource/face_angry.png');
          playerStats.isAngry = true;
        } else if (playerStats.isAngry && percent === 1) {
          playerStats.playerObject.material.map = textureLoader.load('/static/gameSource/face_usual.png');
          playerStats.isAngry = false;
        }

        percent < 1 ? color.setRGB(1, percent, percent) : color.setRGB(1, 1, 1);
      }
    });

    this._updateTable(this._makeListPlayers(data.players), this._id);
  }

  _removePlayer(data) {
    console.log('REMOOOOOVE');
    data.forEach(id => {
      this._scene.remove(this._playersService.getFullPlayer(`id${id}`).playerObject);
      this._playersService.removeFullPlayer(id);
    });
  }

  _animate() {
    if (this._isAnimate) {
      requestAnimationFrame(this._animate.bind(this));
    }

    this._render();

    setTimeout(() => {
      this._updateBackEnd(false);
    }, 30);
  }

  _updateBackEnd(shooting) {
    this._webSocketManager.send({
      type: 'application.mechanics.base.UserSnap',
      data: {
        position: this._getCameraPosition(),
        id: this._player.id,
        camera: this._getCameraRotation(),
        shooting
      }
    });
  }

  _getCameraPosition() {
    return {
      x: this._camera.position.x,
      y: this._camera.position.y,
      z: this._camera.position.z
    };
  }

  _getCameraRotation() {
    return {
      phi: this._camera.rotation.y,
      theta: 0
    };
  }

  _render() {
    const delta = this._clock.getDelta();
    this._keys.update(this._camera, delta, Helper.checkWallCollision.bind(this));

    this._renderer.render(this._scene, this._camera);
  }

  _endGame() {
    this.stop();
    this._keys._deactivateTable();

    musicService.startEndGame();
    this._openEndGame();

    setTimeout(() => {
      localStorage.setItem('multiPlayerScore', playerStats.kills * 100);
      this._closeEndGame();
      this._goToFromGame();
      location.reload();
    }, 4000);
  }

  _updateTable(data, id, type) {
    this._gameTableManager.setData(data, id, type);
  }

  _makeListPlayers(list) {
    const players = [];

    for (let field of list) {
      players.push([field.login, field.kills, field.deaths, field.id]);
    }

    return players;
  }

  _showShoot(health) {
    let lowHealth = null;

    if (health < 30) {
      lowHealth = 1 - health / 100;

      this._hurt.style.opacity = `${lowHealth}`;
    }

    this._hurt.style.opacity = `0.9`;

    setTimeout(() => {
      this._hurt.style.opacity = `${lowHealth ? lowHealth : 0}`;
    }, 300);

    const sound = gameAudioManager.getSound('pain');

    if (sound) {
      sound.play();
    }
  }

  _changeStats(health) {
    if (+health === 100) {
      this._hurt.style.opacity = `0`;
    }

    this._healthText.innerHTML = `${health}  HP`;
    this._healthProgress.style.width = `${health}%`;
  }

  _setKills(hunt, soul) {
    this._stats.style.display = 'block';
    this._kills.innerHTML = `${this._changeUsername(hunt)} killed ${this._changeUsername(soul)}`;
  }

  _stopStats() {
    this._stats.style.display = 'none';
  }

  _changeUsername(name) {
    if (name.length > 7) {
      name = name.slice(0, 7) + '...';
    }

    return name.toUpperCase();
  }
}
