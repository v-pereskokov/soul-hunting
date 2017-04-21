import * as React from 'react';

import {Form} from "../../components/Form/Form";
import {Background} from "../../components/Background/Background";
import {connect} from "react-redux";

import './SignIn.scss';

const signInFields = [{
  title: 'Login',
  name: 'login',
  type: 'text',
  description: 'Enter username',
  placeholder: 'Username'
}, {
  title: 'Password',
  name: 'password1',
  type: 'password',
  description: 'Enter password',
  placeholder: '••••••••'
}];

class SignIn extends React.Component<void, void> {
  render() {
    return (
      <div className='wrapper__registration'>
        <Background />
        <div className='registration'>
          <Form fields={signInFields} control='Sign In'/>
        </div>
      </div>
    );
  }
}

export default connect()(SignIn);
