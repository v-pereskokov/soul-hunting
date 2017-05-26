import * as React from 'react';

import './Information.scss';

interface Props {
  text?: string;
}

export class Information extends React.Component<Props, any> {
  render() {

    return (
      <div className='stats'>
        <p className='stats__username'>Alpha</p>
        {this.props.children}
      </div>
    );
  }
}
