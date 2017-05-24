import GameWebSocket from '../../Tools/GameWebSocket/GameWebSocket';
import {SOCKET_ADDRESS} from '../../Constants/Socket';

export default class GameWebSocketManager {
  constructor() {
    const protocol = GameWebSocket.isSSL() ? 'wss' : 'ws';
    this._webSocket = new GameWebSocket(`wss://${SOCKET_ADDRESS}/game`);

    this._onOpen();
    this._onClose();
  }

  setOnMessage(callback) {
    this._webSocket.onMessage(event => {
      const content = JSON.parse(event.data);
      const data = JSON.parse(content.data);

      console.log(data);

      callback(content, data);
    });
  }

  _onOpen() {
    this._webSocket.onOpen();
  }

  _onClose() {
    this._webSocket.onClose(event => {
      console.log('код: ' + event.code + 'причина ' + event.reason);
      this._id = -1;
    });
  }
}
