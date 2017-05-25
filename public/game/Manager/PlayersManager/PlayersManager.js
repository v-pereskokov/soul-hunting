export default class PlayersService {
  constructor() {
    this._players = [];
  }

  add(player) {
    this._players.push(player);
  }

  getPlayer(index) {
    return this._players[index];
  }

  getFullPlayer(index) {
    for (let player of this._players) {
      if (player[index] !== undefined) {
        return player[index];
      }
    }

    return false;
  }

  remove(index) {
    this._players.splice(index, 1);
  }

  get count() {
    return this._players.length;
  }

  get all() {
    return this._players;
  }
}
