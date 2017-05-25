import GameWebSocket from '../../Tools/GameWebSocket/GameWebSocket';
import {SOCKET_ADDRESS} from '../../Constants/Socket';

export default class GameWebSocketManager {
  constructor() {
    const protocol = GameWebSocket.isSSL() ? 'wss' : 'ws'; // in prod use protocol
    this._webSocket = new GameWebSocket(`wss://${SOCKET_ADDRESS}/game`);
  }

  start(onOpenCallback, onMessageCallback, onCloseCallback) {
    this._onOpen(onOpenCallback);
    this.setOnMessage(onMessageCallback);
    this._onClose(onCloseCallback);
  }

  send(data) {
    this._webSocket.send(data);
  }

  setOnMessage(callback) {
    this._webSocket.onMessage(event => {
      const content = JSON.parse(event.data);
      const data = JSON.parse(content.data);

      // console.log(data);

      callback(content, data);
    });
  }

  _onOpen(callback) {
    this._webSocket.onOpen(callback);
  }

  _onClose(onCloseCallback = null) {
    this._webSocket.onClose(event => {
      console.log('код: ' + event.code + 'причина ' + event.reason);
    });
  }
}
