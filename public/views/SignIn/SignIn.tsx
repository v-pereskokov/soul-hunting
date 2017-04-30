import * as React from 'react';
import {browserHistory} from 'react-router';
import {Background} from "../../components/Background/Background";
import Form from "../../components/Form/Form";

import './SignIn.scss';

const signInFields = [{
  title: 'Login',
  name: 'login',
  type: 'text',
  description: 'Enter username',
  placeholder: 'Username',
  error: ''
}, {
  title: 'Password',
  name: 'password1',
  type: 'password',
  description: 'Enter password',
  placeholder: '••••••••',
  error: ''
}];

export class SignIn extends React.Component<void, void> {
  constructor() {
    super();

    this.setEscape();
  }

  setEscape() {
    document.addEventListener('keydown', event => {
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
    return (
      <div className='wrapper__registration'>
        <Background />
        <div className='registration'>
          <Form
            fields={ signInFields }
            error=''
            control='Sign In'
          />
        </div>
      </div>
    );
  }
}
