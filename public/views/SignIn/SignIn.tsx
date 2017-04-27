import * as React from 'react';

import {Background} from "../../components/Background/Background";
import {connect} from "react-redux";

import './SignIn.scss';
import {Form} from "../../components/Form/Form";

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
        { console.log(this.props.username) }
        { console.log(this.props.password) }
        <Background />
        <div className='registration'>
          <Form
            fields={signInFields}
            error='jio'
            control='Sign In'
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.signin,
    password: state.data
  }
};

export default connect(mapStateToProps)(SignIn);
