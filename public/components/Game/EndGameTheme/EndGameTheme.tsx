import * as React from 'react';

import './EndGameTheme.scss';

export class EndGameTheme extends React.Component<any, any> {
  render() {

    return (
      <div>
        <div className='end'/>
        <div className='endGameTheme__wrapper'>
          <div className='endGameTheme__wrapper-parent'>
            <p className='endGameTheme__wrapper-type'/>
            <p className='endGameTheme__wrapper-gameOver'/>
          </div>
        </div>
      </div>
    );
  }
}
