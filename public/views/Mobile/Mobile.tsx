import * as React from 'react';
import {Link, browserHistory} from 'react-router';

import {Background} from '../../components/Background/Background';
import {Information} from '../../components/Information/Information';
import {Button} from '../../components/Button/Button';

import './Mobile.scss';

export class Mobile extends React.Component<any, any> {
  render() {
    return (
      <div className='wrapper__mobile'>
        <Background closed={ false }/>
        <Information>
          <span className='developer'>ANANYMOUS</span>
          <p className='sorry'>Sorry</p>
          <hr />
          <ul>
            <li className='description__sorry'>
              <label>This application is not working on mobile devices.</label>
              <label> Please, sign in by computer!</label>
            </li>
          </ul>
          <Link to='/'>
            <Button text='Go to home' isActive={ true }/>
          </Link>
        </Information>
      </div>
    );
  }
}
