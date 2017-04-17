import * as React from 'react';
import {Link} from "react-router-dom";

import {Button} from "../../components/Button/Button";
import {Form} from "../../components/Form/Form";

import './SignIn.scss';

const obj = [
  {
    author: 'qwe',
    type: 'text',
    text: 'enter',
    name: 'login',
    placeholder: 'username'
  }, {
    author: 'qwe',
    type: 'text',
    text: 'enter',
    name: 'login',
    placeholder: 'username'
  }
];

export class SignIn extends React.Component<void, void> {
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
          <Form fields={obj}/>
        </div>
      </div>
    );
  }
}
