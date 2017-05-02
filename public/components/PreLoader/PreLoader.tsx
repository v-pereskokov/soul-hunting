import * as React from 'react';
import {connect} from "react-redux";

import './PreLoader.scss';

class PreLoader extends React.Component<void, void> {
  render() {
    const { show } = this.props;

    return (
      <div className='pre-loader__wrapper'>
        { show ?
          <div className="pre-loader">
            <div className="line square"/>
            <div className="line square2"/>
            <div className="line square3"/>
            <div className="line square4"/>
          </div>
          : <div />
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    show: state.preloader
  })
)(PreLoader);
