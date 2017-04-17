import Block from '../Block/Block';

import './Table.scss';
import template from './Table.tmpl.xml';

class Table extends Block {
  constructor(elements = {}) {
    super('div', { class: 'table' });
    this._createTable(elements);
  }

  _createTable(elements) {
    return this._getElement().innerHTML = template({
      head: elements.head,
      body: elements.body
    });
  }
}

export default Table;
