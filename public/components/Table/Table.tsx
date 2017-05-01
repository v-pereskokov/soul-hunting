import * as React from 'react';
import {Link} from 'react-router'

import './Table.scss';

interface Props {
  header: Array<any>;
  content?: Array<any>;
}

export class Table extends React.Component<Props, void> {
  constructor() {
    super();
  }

  render() {
    const header = this.props.header.map((item, index) => {
      return (
        <th key={ index }>
          { item.title }
        </th>
      );
    });

    const content = this.props.content.map((item, index) => {
      return (
        <tr key={ index }>
          <td>
            { index + 1 }
          </td>
          <td>
            { item[0] }
          </td>
          <td>
            { item[1] }
          </td>
        </tr>
      );
    });

    return (
      <table className="scoreboard">
        <thead>
        <tr>
          { header }
        </tr>
        </thead>
        <tbody>
        { content }
        </tbody>
      </table>
    );
  }
}
