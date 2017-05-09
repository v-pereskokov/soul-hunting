class PlayersService {
  constructor() {
    this._players = [];
  }

  add(player) {
    this._players.push(player);
  }

  getPlayer(index) {
    return this._players[index];
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

const playersService = new PlayersService();

export default playersService;
