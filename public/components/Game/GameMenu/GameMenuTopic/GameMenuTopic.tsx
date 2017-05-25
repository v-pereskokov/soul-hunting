import * as React from 'react';

import './GameMenuTopic.scss';

interface Props {
  text: string;
}

export class GameMenuTopic extends React.Component<Props, any> {
  render() {

    return (
      <div className='menu__wrapper__parent-topic'>
        <div className='menu__wrapper__parent-topic-center'>
          <div className='game__menu-topic'>
            {this.props.text}
          </div>
          <div className='game__menu-topic-br'/>
        </div>
      </div>
    );
  }
}
