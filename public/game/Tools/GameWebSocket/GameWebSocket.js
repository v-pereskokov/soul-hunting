export default class GameWebSocket {
  constructor(address) {
    this._ws = new WebSocket(address);
  }

  send(data) {
    this._ws.send(JSON.stringify(data));
  }

  onOpen(callback = null) {
    this._ws.onopen = () => {
      callback ? callback() : null;
    };
  }

  onMessage(callback) {
    this._ws.onmessage = event => {
      callback(event);
    };
  }

  onError(callback) {
    this._ws.onerror = error => {
      console.log('Error ' + error);
      callback(error);
    };
  }

  onClose(callback) {
    this._ws.onclose = event => {
      event.wasClean ? console.log('Closed clean') : console.log('Error closed');
      callback(event);
    };
  }

  static isSSL() {
    return window.location.protocol === 'https:';
  }
}
