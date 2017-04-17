import * as React from 'react';
import {Link} from "react-router-dom";

import {Button} from "../../components/Button/Button";

import './SignIn.scss';

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
        </div>
      </div>
    );
  }
}
