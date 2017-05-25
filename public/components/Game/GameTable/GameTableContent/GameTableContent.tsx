import * as React from 'react';
import {GameTableRow} from '../GameTableRow/GameTableRow';
import {GameTableElement} from '../GameTableElement/GameTableElement';
import {GameTableBody} from '../GameTableBody/GameTableBody';

interface Props {
  content: Array<any>;
}

export class GameTableContent extends React.Component<Props, void> {
  render() {
    const content = this.props.content.map((item, index) => {
      return (
        <GameTableRow key={ index }>
          <GameTableElement item={ index === 0 ? index + 1 : ''}/>
          <GameTableElement item={ item[0] }/>
          <GameTableElement item={ item[1] }/>
          <GameTableElement item={ item[2] }/>
        </GameTableRow>
      );
    });

    return (
      <GameTableBody content={ content }/>
    );
  }
}
