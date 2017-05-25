import * as React from 'react';

import {Button} from '../../components/Button/Button';
import Background from '../../components/Background/Background';
import {Information} from '../../components/Information/Information';

import './Error.scss'

export class Error extends React.Component<any, any> {
  render() {
    return (
      <div className='wrapper__about'>
        <Background closed={ false }/>
        <Information>
          <span className='developer'>ANANYMOUS</span>
          <p className='error__type'>404</p>
          <hr />
          <ul>
            <li className='description__sorry'>
              <label>Page not found</label>
            </li>
          </ul>
          <Button
            text='Go to home'
            isActive={ true }
            pathTo='/'/>
        </Information>
      </div>
    );
  }
}
