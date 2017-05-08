import * as React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {Background} from '../../components/Background/Background';
import {Information} from '../../components/Information/Information';
import {Mobile} from '../Mobile/Mobile';
import {Button} from '../../components/Button/Button';

import GameManager from '../../game/Managers/GameManager/GameManager.js';

class Game extends React.Component<void, void> {
  render() {
    const { device } = this.props;

    new GameManager().startGame();

    return (
      <div className='wrapper__mobile'>
        { device ?
          <div />
          :
          <Background closed={ false }>
            <Mobile />
          </Background>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    device: state.device
  })
)(Game);
