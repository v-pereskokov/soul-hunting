import map from '../Map/Map';
import {UNITSIZE} from '../../Constants/Constants';

export default class Helper {
  static checkWallCollision(position) {
    const positionOnMap = Helper.getMapSector(position);
    if (positionOnMap.x >= 0 && positionOnMap.x < map.width &&
      positionOnMap.z >= 0 && positionOnMap.z < map.height) {
      return map.getField(positionOnMap.x, positionOnMap.z) > 0;
    }

    return false;
  }

  static randomVector(y) {
    let [x, z] = Helper.getRandomPosition();
    while (map._map[x][z] > 0) {
      [x, z] = Helper.getRandomPosition();
    }

    return {
      x: Math.floor(x - map.width / 2) * UNITSIZE,
      z: Math.floor(z - map.width / 2) * UNITSIZE,
      y
    };
  }

  static distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  static getRandomPosition() {
    return [Helper.random(0, map.width - 1), Helper.random(0, map.height - 1)];
  }

  static getMapSector(position) {
    return {
      x: Helper.getSector(position.x),
      z: Helper.getSector(position.z)
    };
  }

  static getSector(position) {
    return Math.floor((position + 250 / 2) / 250 + map.width / 2);
  }

  static random(min, max) {
    return parseInt(Math.floor(min + Math.random() * (max - min + 1)), 10);
  }
}
