export default class WebSocket {
  constructor(address) {
    this._ws = new WebSocket(address);
  }

  send(data) {
    this._ws.send(JSON.stringify(data));
  }

  onOpen(callback) {
    this._ws.onopen = () => {
      console.log("Соединено");
      callback();
    };
  }

  onMessage(callback) {
    this._ws.onmessage = event => {
      console.log("Mes");
      callback(event);
    };
  }

  onError(callback) {
    this._ws.onerror = error => {
      console.log("Error " + error);
      callback(error);
    };
  }

  onClose(callback) {
    this._ws.onclose = event => {
      console.log("Closed");
      callback(event);
    };
  }
}
