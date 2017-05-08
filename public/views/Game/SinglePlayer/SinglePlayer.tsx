import * as React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {Mobile} from '../../Mobile/Mobile';
import {Background} from '../../../components/Background/Background';

import GameManager from '../../../game/Managers/GameManager/GameManager.js';

import '../Game.scss';

class SinglePlayer extends React.Component<void, void> {
  componentDidMount() {
    new GameManager().startGame();
  }

  render() {
    const {isAuthenticated, device} = this.props;

    return (
      <div>
        { !isAuthenticated ?
          browserHistory.push('/')
          :
          <div className='wrapper__game'>
            { device ?
              <div>
                <div className='parent__inf'>
                  <div className='parent__inf__wrapper'>
                    <img className='parent__inf__wrapper-img' src='/static/gameSource/infinity-icon.png'/>
                  </div>
                </div>
                < div className='parent__aim'>
                  < div className='parent__aim__wrapper'>
                    <img className='parent__aim__wrapper-img' src='/static/gameSource/aim.png'/>
                  </div>
                </div>
                <div className='wrapper__health'>
                  <p className='wrapper__health-text'>100 HP</p>
                  <div className='wrapper__health-red'/>
                </div>
                <div className='game__background'/>
                <div className='weapon'>
                  <img className='weapon__img' src='/static/gameSource/weapon.png'/>
                </div>
              </div>
              :
              <div className='wrapper__mobile'>
                <Background closed={ false }/>
                <Mobile />
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    device: state.device
  }
};

export default connect(mapStateToProps, null)(SinglePlayer);
