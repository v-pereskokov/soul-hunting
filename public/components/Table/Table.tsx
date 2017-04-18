import * as React from 'react';
import {Link} from "react-router-dom";

import './Table.scss';
import {Button} from "../Button/Button";

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
            { item.username }
          </td>
          <td>
            { item.score }
          </td>
        </tr>
      );
    });

    return (
      <div className="table">
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
      </div>
    );
  }
}
