export default class PlayersService {
  constructor() {
    this._players = [];
    this._playersFullPlayer = {};
  }

  add(player) {
    this._players.push(player);
  }

  getPlayer(index) {
    return this._players[index];
  }

  getFullPlayer(index) {
    return this._playersFullPlayer[index];
  }

  setFullPlayer(index, data) {
    this._playersFullPlayer[`id${index}`] = data;
  }

  removeFullPlayer(index) {
    delete this._playersFullPlayer[`id${index}`];
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
