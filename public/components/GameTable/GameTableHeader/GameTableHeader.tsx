import * as React from 'react';
import {GameTableRow} from '../GameTableRow/GameTableRow';

export class GameTableHeader extends React.Component<void, void> {
  render() {
    const header = this.props.header.map((item, index) => {
      return (
        <th key={ index }>
          { item.title }
        </th>
      );
    });

    return (
      <thead className='gameTable-head'>
        <GameTableRow>
          { header }
        </GameTableRow>
      </thead>
    );
  }
}
