import * as React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {Mobile} from '../../Mobile/Mobile';
import {Background} from '../../../components/Background/Background';

import musicService from '../../../service/MusicService/MusicService';
import GameManager from '../../../game/Manager/GameManager/GameManager.js';

import '../Game.scss';

class SinglePlayer extends React.Component<void, void> {
  componentWillMount() {
    setTimeout(() => {
      musicService.stopBackground();
    }, 300);
  }

  componentDidMount() {
    new GameManager();
  }

  render() {
    const {isAuthenticated, device} = this.props;

    return (
      <div>
        { !isAuthenticated ?
          browserHistory.push('/')
          :
          <div>
            { device ?
              <div>
                <div className='blocker'>
                  <div className='instructions'>
                    <img className='loading' src='/static/images/loading.png'/>
                    <p className='loading-text'>After preloader disappears,
                      click on the screen</p>
                  </div>
                </div>
                <div className='wrapper__game'>
                  <div>
                    <div className='parent__inf'>
                      <div className='parent__inf__wrapper'>
                        <img className='parent__inf__wrapper-img' src='/static/gameSource/infinity-icon.png'/>
                      </div>
                    </div>
                    <div className='sight'>
                      <div className='sight__top'/>
                      <div className='sight__right'/>
                      <div className='sight__bottom'/>
                      <div className='sight__left'/>
                    </div>
                    <div className='wrapper__health'>
                      <p className='wrapper__health-text'>100 HP</p>
                      <div className='wrapper__health-red'/>
                    </div>
                    <div className='game__background'/>
                    <div className='weapon__wrapper'>
                      <img className='weapon__wrapper-img' src='/static/gameSource/weapon.png'/>
                    </div>
                  </div>
                  <div className='end'>
                  </div>
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
    device: state.device,
  }
};

export default connect(mapStateToProps)(SinglePlayer);
