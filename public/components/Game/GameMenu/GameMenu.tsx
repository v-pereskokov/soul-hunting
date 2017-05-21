import * as React from 'react';

import {GameMenuBackground} from './GameMenuBackground/GameMenuBackground';
import {GameMenuWrapper} from './GameMenuWrapper/GameMenuWrapper';
import {GameMenuButtons} from './GameMenuButtons/GameMenuButtons';
import {GameMenuTopic} from './GameMenuTopic/GameMenuTopic';

interface Props {
  text: string;
}

export class GameMenu extends React.Component<Props, any> {
  render() {

    return (
      <div>
        <GameMenuBackground />
        <GameMenuWrapper />
        <GameMenuButtons />
        <GameMenuTopic text={this.props.text} />
      </div>
    );
  }
}
