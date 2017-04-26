import * as React from 'react';

import {Logo} from "../../components/Logo/Logo";
import {PreLoader} from "../../components/PreLoader/PreLoader";
import {Footer} from "../../components/Footer/Footer";
import { connect } from 'react-redux';

import './MainTemplate.scss';
import {connect} from "react-redux";

class MainTemplate extends React.Component<void, void> {
  render() {
    return (
      <div className='wrapper'>
        {console.log(this.props.state)}
        <PreLoader />
        <Logo />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {state}
};

export default connect(mapStateToProps)(MainTemplate);
