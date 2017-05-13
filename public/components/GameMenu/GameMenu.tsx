import * as React from 'react';

import {GameMenuBackground} from './GameMenuBackground/GameMenuBackground';
import {GameMenuWrapper} from './GameMenuWrapper/GameMenuWrapper';
import {GameMenuButtons} from './GameMenuButtons/GameMenuButtons';
import {GameMenuTopic} from './GameMenuTopic/GameMenuTopic';

export class GameMenu extends React.Component<any, any> {
  render() {

    return (
      <div>
        <GameMenuBackground />
        <GameMenuWrapper />
        <GameMenuButtons />
        <GameMenuTopic text='Singleplayer' />
      </div>
    );
  }
}
