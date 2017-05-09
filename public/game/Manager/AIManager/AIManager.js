import Helper from "../../Tools/Helper/Helper";
import {AI_PAUSE_SHOOT} from '../../Constants/Constants';
import map from '../../Tools/Map/Map';

export default class AIService {
  static updateAI(scene, playersService,
                  playerStats, speed,
                  playerIndex, addAI) {
    let player = playersService.getPlayer(playerIndex);

    if (player.health <= 0) {
      playersService.remove(playerIndex);

      scene.remove(player.object);
      playerStats.kills = ++playerStats.kills;

      $('#score').html(playerStats.kills * 100);
      addAI();
    }

    const step = Math.random();

    if (step > 0.995) {
      player.x = Math.random() * 2 - 1;
      player.z = Math.random() * 2 - 1;
    }

    player.translateX(speed * player.x);
    player.translateZ(speed * player.z);

    const position = player.object.position;
    const sector = Helper.getMapSector(position);

    if (sector.x < 0 || sector.x >= map.width ||
      sector.y < 0 || sector.y >= map.height ||
      Helper.checkWallCollision(position)) {
      player.translateX(-2 * speed * player.x);
      player.translateZ(-2 * speed * player.z);
      player.x = Math.random() * 2 - 1;
      player.z = Math.random() * 2 - 1;
    }

    if (sector.x < -1 || sector.x > map.width ||
      sector.z < -1 || sector.z > map.height) {
      playersService.remove(playerIndex);
      scene.remove(player.object);
      addAI();
    }
  }

  static shoot(camera, player, sector, createBullet) {
    const cameraPosition = Helper.getMapSector(camera.position);

    if (Date.now() > player.lastShot + AI_PAUSE_SHOOT &&
      Helper.distance(
        sector.x,
        sector.z,
        cameraPosition.x,
        cameraPosition.z
      ) < 2) {
      createBullet(player.object);
      player.lastShot = Date.now();
    }
  }
}
