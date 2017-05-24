import * as React from 'react';

import './EndGameTheme.scss';

interface Props {
  text: string;
}

export class EndGameTheme extends React.Component<Props, any> {
  render() {
    return (
      <div>
        <div className='end'/>
        <div className='endGameTheme__wrapper'>
          <div className='endGameTheme__wrapper-parent'>
            <p className='endGameTheme__wrapper-type'>{this.props.text}</p>
            <p className='endGameTheme__wrapper-gameOver'>Game Over</p>
          </div>
        </div>
      </div>
    );
  }
}
