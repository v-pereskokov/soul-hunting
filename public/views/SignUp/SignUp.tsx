import * as React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import Form from '../../components/Form/Form';
import Background from '../../components/Background/Background';

import './SignUp.scss';

const signUpFields = [{
  title: 'Login',
  name: 'login',
  type: 'text',
  description: 'Must be at least 2 characters',
  placeholder: 'Ivan Petrov'
}, {
  title: 'Email',
  name: 'email',
  type: 'email',
  description: 'Email is email',
  placeholder: 'ivanpetrov@mail.ru'
}, {
  title: 'Password',
  name: 'password1',
  type: 'password',
  description: '8 characters or more. Be tricky',
  placeholder: '••••••••'
}, {
  title: 'Repeat password',
  name: 'password2',
  type: 'password',
  description: 'Please, repeat password',
  placeholder: '••••••••'
}];

interface Props {
  isAuthenticated: boolean;
}

export class SignUp extends React.Component<Props, void> {
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
    const { isAuthenticated } = this.props;

    return (
      <div className='wrapper__registration'>
        <Background closed={ true }/>
        { isAuthenticated ?
          browserHistory.push('/')
          : <div className='registration'>
            <Form
              fields={signUpFields}
              control='Sign Up'/>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
};

export default connect(mapStateToProps)(SignUp); 
