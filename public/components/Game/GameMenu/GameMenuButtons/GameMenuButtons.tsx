import * as React from 'react';
import {browserHistory} from 'react-router';

import {Button} from '../../../Button/Button';

import './GameMenuButtons.scss';

export class GameMenuButtons extends React.Component<any, any> {
  render() {

    return (
      <div className='menu__wrapper__parent-buttons'>
        <div className='menu__wrapper__parent-buttons-center'>
          <div className='game__menu-buttons'>
            <Button text='RESUME' isActive={true}/>
            <Button
              text='EXIT'
              isActive={false}
              click={() => {
                browserHistory.push('/game');
                location.reload();
              }}/>
          </div>
        </div>
      </div>
    );
  }
}
