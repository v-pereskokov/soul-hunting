import PlayerService from "../../Manager/PlayerManager/PlayerManager";

class PlayerStats {
  constructor(object = null) {
    this._service = new PlayerService(object, 100);
  }

  get health() {
    return this._service.health;
  }

  get kills() {
    return this._service.kills;
  }

  set health(health) {
    this._service.health = health;
  }

  set kills(kills) {
    this._service.kills = kills;
  }
}

const playerStats = new PlayerStats();

export default playerStats;
