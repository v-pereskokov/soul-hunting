export default class GameTableManager {
  constructor() {
    this._table = document.body.querySelector('.gameTable').getElementsByTagName('tbody')[0];
  }

  setData(list, type = true) {
    this._table.innerHTML = this._getContentFields(this._sortList(list, type));
  }

  _getContentFields(list) {
    let content = '';

    for (let fieldIndex in list) {
      content += '<tr>';
      content += `<td>${+fieldIndex + 1}</td>`;
      const field = list[fieldIndex];
      for (let dataIndex in field) {
        content += `<td>${field[dataIndex]}</td>`;
      }
      content += '</tr>';
    }

    return content;
  }

  _sortList(list, type) {
    return list.sort(this._comparator(type));
  }

  _comparator(type) {
    return (lhs, rhs) => {
      if (type && lhs[1] === rhs[1]) {
        return rhs[2] - lhs[2];
      }

      return rhs[1] - lhs[1];
    };
  }
}
