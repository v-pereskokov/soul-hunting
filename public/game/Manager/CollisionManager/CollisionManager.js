import Helper from "../../Tools/Helper/Helper";
import { DAMAGE } from '../../Constants/Constants';
import textureLoader from '../LoaderManager/LoaderManager';

export default class CollisionService {
  static collisionBulletWithWall(position) {
    return Helper.checkWallCollision(position);
  }

  static collisionBulletWithAi(scene, playersService, bulletsService, bullet,
                               bulletPosition, bulletNumber) {
    for (let j in playersService.all) {
      const player = playersService.getPlayer(j);

      const vertices = player.object.geometry.vertices[0];
      const playerPosition = player.object.position;

      const x = Math.abs(vertices.x) * 2;
      const z = Math.abs(vertices.z) * 2;

      if (bulletPosition.x < playerPosition.x + x &&
        bulletPosition.x > playerPosition.x - x &&
        bulletPosition.z < playerPosition.z + z &&
        bulletPosition.z > playerPosition.z - z &&
        bullet.owner !== player.object) {

        bulletsService.remove(bulletNumber);
        scene.remove(bullet.object);
        player.health = player.health - DAMAGE;

        const color = player.object.material.color;
        const percent = player.health / 100;

        if (!player.isAngry && percent < 1) {
          player.object.material.map = textureLoader.load('/static/gameSource/mad.gif');
          player.isAngry = true;
        }

        player.object.material.color.setRGB(
          Math.max(percent, 1) * color.r,
          percent * color.g,
          percent * color.b
        );

        return true;
      }
    }

    return false;
  }

  static collisionBulletWithPlayer(scene, playerStats, bulletsService,
                                   bulletPosition, camera, bullet, bulletIndex) {
    if (Helper.distance(
      bulletPosition.x,
        bulletPosition.z,
        camera.position.x,
        camera.position.z
      ) < 25 &&
      bullet.owner !== camera) {
      playerStats.health = playerStats.health - 10;

      if (playerStats.health < 0) {
        playerStats.health = 0;
      }

      document.body.querySelector('.wrapper__health-text').innerHTML = `${playerStats.health}  HP`;
      document.body.querySelector('.wrapper__health-red').style.width = `${playerStats.health}%`;

      bulletsService.remove(bulletIndex);
      scene.remove(bullet.object);
    }
  }
}
