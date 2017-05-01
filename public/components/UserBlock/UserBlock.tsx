import * as React from 'react';
import {connect} from "react-redux";

import {Button} from "../Button/Button";

import './UserBlock.scss';

class UserBlock extends React.Component<void, void> {
  top() {
    alert('top');
  }

  render() {
    const { user } = this.props;

    return (
      <div className='userblock'>
        <p className='userblock__username'>
          { user.toUpperCase() }
        </p>
        <div className='userblock__button'>
          <Button
          text='LOGOUT'
          isActive={ false }
          click={ this.top.bind(this) }
          size='s'
          />
        </div>
        <img src="/static/images/userphoto.png" className="userblock__userphoto" />
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.authentication.user
  })
)(UserBlock);
