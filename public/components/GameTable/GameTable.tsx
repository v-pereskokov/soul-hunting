import * as React from 'react';
import {Link} from 'react-router'

import {GameTableBase} from './GameTableBase/GameTableBase';
import {GameTableHeader} from './GameTableHeader/GameTableHeader';
import {GameTableContent} from './GameTableContent/GameTableContent';
import {GameTableEdge} from './GameTableEdge/GameTableEdge';

import './GameTable.scss';

interface Props {
  header: Array<any>;
  content?: Array<any>;
}

export default class GameTable extends React.Component<Props, void> {
  render() {
    return (
      <GameTableBase>
        <GameTableHeader header={ this.props.header } />
        <GameTableEdge />
        <GameTableContent content={ this.props.content } />
      </GameTableBase>
    );
  }
}
