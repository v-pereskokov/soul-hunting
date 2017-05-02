import * as React from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';

import {Button} from '../Button/Button';
import transport from '../../service/Transport/Transoprt';
import {setCurrentUser} from '../../actions/User/User.actions';

import './UserBlock.scss';

class UserBlock extends React.Component<void, void> {
  logout() {
    this.props.logout()
      .then(response => {
        if (+response.status === 200) {
          localStorage.removeItem('token');
          this.props.setCurrentUser(null);
        }

        browserHistory.push('/');
      });
  }

  render() {
    const { user } = this.props;

    user = this._checkName(user);
    return (
      <div className='userblock'>
        <p className='userblock__username'>
          { user }
        </p>
        <div className='userblock__button'>
          <Button
          text='LOGOUT'
          isActive={ false }
          click={ this.logout.bind(this) }
          size='s'
          />
        </div>
        <img src='/static/images/userphoto.png' className='userblock__userphoto' />
      </div>
    );
  }

  _checkName(name) {
    if (name.length > 8) {
      name = name.slice(0, 8) + '...';
    }
    return name.toUpperCase();
  }
}

const mapStateToProps = state => {
  return {
    user: state.authentication.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      return transport.post('/logout');
    },

    setCurrentUser: user => {
      dispatch(setCurrentUser(user))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserBlock);
