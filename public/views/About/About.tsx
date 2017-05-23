import * as React from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';

import Background from '../../components/Background/Background';
import {Information} from '../../components/Information/Information';

import './About.scss'

interface Props {
  isAuthenticated: boolean;
}

class About extends React.Component<Props, void> {
  render() {
    const {isAuthenticated} = this.props;

    return (
      <div className='wrapper__about'>
        <Background closed={ true }/>
        { !isAuthenticated ?
          browserHistory.push('/')
          : <Information>
            <span className='developer'>ANANYMOUS</span>
            <p className='field__develop'>FrontEnd</p>
            <hr />
            <ul>
              <li className='author__name'>
                <label>Pereskokov Vladislav</label>
              </li>
              <li className='author__name'>
                <label>Artyuhov Vladislav</label>
              </li>
            </ul>
            <p className='field__develop'>BackEnd</p>
            <hr />
            <ul>
              <li className='author__name'>
                <label>Nabokov Denis</label>
              </li>
            </ul>
          </Information>
        }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
};

export default connect(mapStateToProps)(About);
