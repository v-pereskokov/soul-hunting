import * as React from 'react';

import {FooterBase} from './FooterBase/FooterBase';
import {FooterTeam} from './FooterTeam/FooterTeam';
import {FooterHelp} from './FooterHelp/FooterHelp';

import './Footer.scss';

export class Footer extends React.Component<void, void> {
  render() {
    return (
      <FooterBase>
        <FooterHelp />
        <FooterTeam />
      </FooterBase>
    );
  }
}
