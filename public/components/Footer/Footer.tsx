import * as React from 'react';

import {FooterBase} from './FooterBase/FooterBase';

import './Footer.scss';
import {FooterHelp} from './FooterHelp/FooterHelp';
import {FooterTeam} from './FooterTeam/FooterTeam';

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
