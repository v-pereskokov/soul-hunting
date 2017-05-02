import * as React from 'react';
import {browserHistory} from 'react-router';

import {Background} from '../../components/Background/Background';

import './Mobile.scss';

export class Mobile extends React.Component<void, void> {
  render() {
    return (
      <div className='wrapper__mobile'>
        <Background />
        <div className='mobile__wrapper-form'>
          <div className='mobile__form'>
            <div className='mobile__form-header'>
              <span>Soul Hunting</span>
            </div>
            <form className='mobile__form-content'>
              <span className='developer'>ANANYMOUS</span>
              <p className='sorry'>Sorry</p>
              <hr />
              <ul>
                <li className='description__sorry'>
                  <label>This application is not working on mobile devices.</label>
                  <label> Please, sign in by computer!</label>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
