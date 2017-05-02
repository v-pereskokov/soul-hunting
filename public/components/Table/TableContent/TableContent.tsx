import * as React from 'react';
import {TableRow} from '../TableRow/TableRow';
import {TableElement} from '../TableElement/TableElement';
import {TableBody} from '../TableBody/TableBody';

export class TableContent extends React.Component<void, void> {
  render() {
    const content = this.props.content.map((item, index) => {
      return (
        <TableRow key={ index }>
          <TableElement item={ index + 1 }/>
          <TableElement item={ item[0] }/>
          <TableElement item={ item[1] }/>
        </TableRow>
      );
    });

    return (
      <TableBody content={ content }/>
    );
  }
}
