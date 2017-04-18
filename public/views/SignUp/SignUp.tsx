import * as React from 'react';
import {Link} from "react-router-dom";

import {Form} from "../../components/Form/Form";

import './SignUp.scss';

const signUpFields = [{
  title: 'Login',
  name: 'login',
  type: 'text',
  description: 'Enter username',
  placeholder: 'Username'
}, {
  title: 'Email',
  name: 'email',
  type: 'email',
  description: 'Enter email',
  placeholder: 'Email address'
}, {
  title: 'Password',
  name: 'password1',
  type: 'password',
  description: 'Enter password',
  placeholder: '••••••••'
}, {
  title: 'Repeat password',
  name: 'password2',
  type: 'password',
  description: 'Enter password',
  placeholder: '••••••••'
}];

export class SignUp extends React.Component<void, void> {
  render() {
    return (
      <div className='wrapper__registration'>
        <Link to='/'>
          <span className='close'>
            &times;
          </span>
        </Link>
        <div className='registration__back'>
        </div>
        <div className='registration'>
          <Form fields={signUpFields} control='Sign Up'/>
        </div>
      </div>
    );
  }
}
