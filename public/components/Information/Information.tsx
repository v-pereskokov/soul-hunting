import * as React from 'react';
import {browserHistory} from 'react-router';

import {Background} from '../Background/Background';

import './Information.scss';

export class Information extends React.Component<any, any> {
  render() {
    return (
      <div className='wrapper__information'>
        <Background />
        <div className='information__wrapper-form'>
          <div className='information__form'>
            <div className='information__form-header'>
              <span>Soul Hunting</span>
            </div>
              <form className='information__form-content' name='{data.title}'>
                { this.props.children }
              </form>
          </div>
        </div>
      </div>
    );
  }
}
