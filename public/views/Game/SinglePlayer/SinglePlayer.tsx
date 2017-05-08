import * as React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import GameManager from '../../../game/Managers/GameManager/GameManager.js';

class SinglePlayer extends React.Component<void, void> {
  render() {
    const {device} = this.props;

    new GameManager().startGame();

    return (
      <div>
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
