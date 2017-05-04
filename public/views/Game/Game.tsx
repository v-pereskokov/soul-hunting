import * as React from 'react';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';

import {Background} from '../../components/Background/Background';
import {Information} from '../../components/Information/Information';
import {Mobile} from '../Mobile/Mobile';
import {Button} from '../../components/Button/Button';

class Game extends React.Component<void, void> {
  render() {
    const { device } = this.props;

    return (
      <div className='wrapper__mobile'>
        <Background closed={ false }/>
        { device ?
          <Information>
            <span className='developer'>ANANYMOUS</span>
            <p className='sorry'>Soon</p>
            <hr />
            <Link to='/'>
              <Button text='Go to home' isActive={ true }/>
            </Link>
          </Information>
          :
          <Mobile />
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
