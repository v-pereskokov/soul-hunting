import * as React from 'react';

import './Information.scss';

interface Props {
  text?: string;
  isMini?: boolean;
}

export class Information extends React.Component<Props, any> {
  render() {
    const {text, isMini} = this.props;
    const classes = `stats stats__position-leftUp ${isMini ? 'mini' : 'big'}`;

    return (
      <div className={classes}>
        <p className='stats__username'>{text}</p>
        {this.props.children}
      </div>
    );
  }
}
