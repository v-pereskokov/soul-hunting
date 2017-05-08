class Map {
  constructor() {
    this._map = [
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 0, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 0, 0, 2, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 2, 0, 0, 0, 1],
      [1, 0, 0, 2, 0, 0, 2, 0, 0, 1],
      [1, 0, 0, 0, 2, 0, 0, 0, 1, 1],
      [1, 1, 1, 0, 0, 0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0, 1, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
  }

  get width() {
    return this._map.length;
  }

  get height() {
    return this._map[0].length;
  }

  getLine(i) {
    return this._map[i];
  }

  getField(i, j) {
    return this._map[i][j];
  }
}

const map = new Map();

export default map;
