export default class GameTableManager {
  constructor() {
    this._table = document.body.querySelector('.gameTable').getElementsByTagName('tbody')[0];
  }

  setData(list, id, type = true) {
    this._table.innerHTML = '';
    this._getContentFields(this._table, this._sortList(list, type), id);
  }

  _getContentFields(table, list, id) {
    for (let fieldIndex in list) {
      let content = '';
      let isYou = false;
      const tr = document.createElement('tr');

      content += `<td>${+fieldIndex + 1}</td>`;
      const field = list[fieldIndex];

      for (let dataIndex in field) {
        if (+dataIndex === 3) {
          if (+field[dataIndex] === id) {
            isYou = true;
          }

          continue;
        }

        content += `<td>${field[dataIndex]}</td>`;
      }

      tr.innerHTML = content;
      tr.className = isYou ? 'yourTable' : '';

      table.appendChild(tr);
    }
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
