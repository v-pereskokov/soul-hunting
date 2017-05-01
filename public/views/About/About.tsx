import * as React from 'react';
import {browserHistory} from 'react-router';
import {connect} from "react-redux";
import {Background} from "../../components/Background/Background";

import './About.scss';

class About extends React.Component<void, void> {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className="about__wrapper-elements">
        <Background />
        <div className="about__header">
          <span>Soul Hunting</span>
        </div>
        { !isAuthenticated ?
          browserHistory.push('/')
          :
          <form className="about" name="{data.title}">
            <span className="developer">ANANYMOUS</span>
            < p className="field__develop">FrontEnd</p>
            <hr />
            <ul>
              <li className="author__name">
                <label>Pereskokov Vladislav</label>
              </li>
              <li className="author__name">
                <label>Artyuhov Vladislav</label>
              </li>
            </ul>
            <p className="field__develop">BackEnd</p>
            <hr />
            <ul>
              <li className="author__name">
                <label>Nabokov Denis</label>
              </li>
            </ul>
          </form>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    isAuthenticated: state.authentication.isAuthenticated
  })
)(About);

