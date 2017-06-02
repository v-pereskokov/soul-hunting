import * as React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import Background from '../../components/Background/Background';
import Form from '../../components/Form/Form';

import './SignIn.scss';

const signInFields = [{
  title: 'Login',
  name: 'login',
  type: 'text',
  description: 'Must be at least 2 characters',
  placeholder: 'Ivan Petrov',
  error: ''
}, {
  title: 'Password',
  name: 'password1',
  type: 'password',
  description: '8 characters or more. Be tricky',
  placeholder: '••••••••',
  error: ''
}];

interface Props {
  isAuthenticated: boolean;
  device?: boolean;
}

class SignIn extends React.Component<Props, void> {
  constructor() {
    super();

    this.setEscape();
  }

  setEscape() {
    document.addEventListener('keydown', (event: any) => {
      switch (event.keyCode) {
        case 27:
          browserHistory.push('/');
          break;
        default:
          break;
      }
    });
  }

  render() {
    const {isAuthenticated, device} = this.props;
    const classes = device ? 'registration' : 'mobile__registration';

    return (
      <div className='wrapper__registration'>
        <Background closed={ true }/>
        { isAuthenticated ?
          browserHistory.push('/')
          : <div className={ classes }>
            <Form
              fields={ signInFields }
              control='Sign In'
            />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    device: state.device
  }
};

export default connect<{}, {}, Props>(mapStateToProps)(SignIn);
