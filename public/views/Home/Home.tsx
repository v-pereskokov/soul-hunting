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
            <Link to='/signin'>
              <Button text='SING IN' isActive={ true }/>
            </Link>
            <Button text='REGISTER' isActive={ false }/>
          </div>
        </div>
      </div>
    );
  }
}
