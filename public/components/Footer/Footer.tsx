import * as React from 'react';

import {FooterBase} from './FooterBase/FooterBase';
import {FooterTeam} from './FooterTeam/FooterTeam';
import {FooterHelp} from './FooterHelp/FooterHelp';

import './Footer.scss';

export class Footer extends React.Component<any, any> {
  render() {
    return (
      <FooterBase>
        <FooterHelp />
        <FooterTeam />
      </FooterBase>
    );
  }
}
