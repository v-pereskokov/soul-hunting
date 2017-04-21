import * as React from 'react';
import {Link} from "react-router-dom";

import {Button} from "../../components/Button/Button";

import './Home.scss';

export class Home extends React.Component<void, void> {
  render() {
    return (
      <div className="wrapper__form">
        <div className="wrapper__main__form">
          <div className='main__form'>

            <Link to='/signin' key="010101001">
              <Button text='SIGN IN' isActive={ true }/>
            </Link>
            <Link to='/signup' key="101010110">
              <Button text='REGISTER' isActive={ false }/>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
