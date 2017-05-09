import map from '../Map/Map';

export default class Helper {
  static checkWallCollision(position) {
    const positionOnMap = Helper.getMapSector(position);
    return map.getField(positionOnMap.x, positionOnMap.z) > 0;
  }

  static distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }

  static getRandomPosition() {
    return [Helper.random(0, map.width - 1), Helper.random(0, map.height - 1)];
  }

  static getMapSector(position) {
    // console.log(Helper.getSector(position.x));

    return {
      x: Helper.getSector(position.x),
      z: Helper.getSector(position.z)
    }
  }

  static getSector(position) {
    return Math.floor((position + 250 / 2) / 250 + map.width / 2)
  }

  static random(min, max) {
    return parseInt(Math.floor(min + Math.random() * (max - min + 1)), 10);
  }
}
