export default class GameTableManager {
  constructor() {
    this._table = document.body.querySelector('.gameTable').getElementsByTagName('tbody')[0];
  }

  setData(list) {
    this._table.innerHTML = this._getContentFields(list);
  }

  _getContentFields(list) {
    let content = '<tr>';

    for (let field of list) {
      content += `<td>${field}</td>`;
    }

    content += '</tr>';

    return content;
  }

  _getHeader(list) {
    return `
    <thead class='gameTable-head'>
      ${this._getHeaderFields(list)}
    </thead>
    `;
  }

  _getHeaderFields(list) {
    let headers = '';

    for (let field of list) {
      headers += `<tr>${field}</tr> `
    }

    return headers;
  }
}
