import * as React from 'react';

import {Logo} from "../../components/Logo/Logo";
import {PreLoader} from "../../components/PreLoader/PreLoader";
import {Footer} from "../../components/Footer/Footer";
import { connect } from 'react-redux';

import './MainTemplate.scss';

class MainTemplate extends React.Component<void, void> {
  render() {
    return (
      <div className='wrapper'>
        <PreLoader />
        <Logo />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

export default connect()(MainTemplate);
