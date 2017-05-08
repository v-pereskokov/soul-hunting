import * as React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import GameManager from '../../../game/Managers/GameManager/GameManager.js';

import '../Game.scss';

class SinglePlayer extends React.Component<void, void> {
  componentDidMount() {
    console.log(document.body.querySelector('.wrapper__game'));
    new GameManager().startGame();
  }

  render() {
    const {device} = this.props;

    return (
      <div className='wrapper__game'>
        <div className='parent__inf'>
          <div className='parent__inf__wrapper'>
            <img className='parent__inf__wrapper-img' src='/static/gameSource/infinity-icon.png'/>
          </div>
        </div>
        <div className='parent__aim'>
          <div className='parent__aim__wrapper'>
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
    );
  }
}

const mapStateToProps = state => {
  return {
    device: state.device
  }
};

export default connect(mapStateToProps, null)(SinglePlayer);
