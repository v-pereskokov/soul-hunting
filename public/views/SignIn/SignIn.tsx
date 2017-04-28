import * as React from 'react';

import {Background} from "../../components/Background/Background";
import {connect} from "react-redux";
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

interface Props {
  username: string;
  password: string;
}

class SignIn extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
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

const mapStateToProps = state => {
  return {
    state
  }
};

export default connect(mapStateToProps)(SignIn);
