import GameScene from "../../GameScene/GameScene";
import CheckPointerLockApi from "../../Tools/PointerLock/CheckPointerLockApi/CheckPointerLockApi";

export default class GameManager {
  startGame() {
    const check = new CheckPointerLockApi();
    if (check.isHave) {
      new GameScene().start();
    }
  }
}
