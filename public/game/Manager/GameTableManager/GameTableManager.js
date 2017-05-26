export default class GameTableManager {
  constructor() {
    this._table = document.body.querySelector('.gameTable').getElementsByTagName('tbody')[0];
  }

  setData(list, type = true) {
    this._table.innerHTML = this._getContentFields(this._sortList(list, type));
  }

  _getContentFields(list) {
    let content = '<tr>';

    for (let field of list) {
      for (let index in field) {
        if (index > 0) {
          content += `<td>${field[index]}</td>`;
        } else {
          content += `<td>${index + 1}</td>`;
        }
      }
    }

    content += '</tr>';

    return content;
  }

  _sortList(list, type) {
    console.log(list.sort(this._comparator(type)));
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
