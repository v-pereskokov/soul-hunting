import * as React from 'react';

import {Logo} from "../../components/Logo/Logo";
import {PreLoader} from "../../components/PreLoader/PreLoader";

import './MainTemplate.scss';

export class MainTemplate extends React.Component<void, void> {
  render() {
    return (
      <div className='wrapper'>
        <PreLoader />
        <Logo />
        { this.props.children }
      </div>
    );
  }
}
