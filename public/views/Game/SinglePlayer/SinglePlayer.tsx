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
        <div className='weapon'/>
        <div className='game__background'/>
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
