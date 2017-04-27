import * as React from 'react';

import {Background} from "../../components/Background/Background";
import {connect} from "react-redux";
import { Field, reduxForm } from 'redux-form'

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
  handleSubmit?: () => void;
}

class SignIn extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { handleSubmit } = this.props;

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
            submit={ handleSubmit }
          />
        </div>
      </div>
    );
  }

  static validate(values) {
    const errors = { username: '', password: '' };

    if (!values.username) {
      errors.username = 'Username is required.';
      console.log('username');
    }

    if (!values.password) {
      errors.password = 'Password is required.';
      console.log('pswd');

    }

    return errors;
  }
}

// const mapStateToProps = state => {
//   return {
//     username: state.signIn.username,
//     password: state.signIn.password
//   }
// };
//
// export default connect(mapStateToProps)(SignIn);

export default reduxForm({
  form: 'login',
  fields: [
    'username',
    'password',
  ],
  validate: SignIn.validate,
})(SignIn);
