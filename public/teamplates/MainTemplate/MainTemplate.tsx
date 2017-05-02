import * as React from 'react';
import { connect } from 'react-redux';

import {Logo} from '../../components/Logo/Logo';
import PreLoader from '../../components/PreLoader/PreLoader';
import {Footer} from '../../components/Footer/Footer';
import UserBlock from '../../components/UserBlock/UserBlock';

import './MainTemplate.scss';

class MainTemplate extends React.Component<void, void> {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div className='wrapper'>
        { isAuthenticated && <UserBlock /> }
        <PreLoader />
        <Logo />
        { this.props.children }
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated
  }
};

export default connect(mapStateToProps)(MainTemplate);
