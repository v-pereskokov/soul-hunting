import * as React from 'react';

import LogoBase from './LogoBase/LogoBase';
import {LogoTitle} from './LogoTitle/LogoTitle';
import {LogoRegistration} from './LogoRegistration/LogoRegistration';

import './Logo.scss';

export class Logo extends React.Component<any, any> {
  render() {
    return (
      <LogoBase >
        <LogoTitle />
        <LogoRegistration />
      </LogoBase>
    );
  }
}
