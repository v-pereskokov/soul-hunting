import * as React from 'react';

import './Information.scss';

interface Props {
  text?: string;
  isMini?: boolean;
  type: string;
}

export class Information extends React.Component<Props, any> {
  render() {
    const {text, isMini, type} = this.props;
    const classes = `stats stats__position-${this.checkType(type)} ${isMini ? 'mini' : 'big'}`;

    return (
      <div className={classes}>
        <p className='stats__username'>{text}</p>
        {this.props.children}
      </div>
    );
  }

  private checkType(type: string): any {
    switch (type) {
      case 'info':
        return 'leftUp';
      case 'connect':
        return 'leftDown';
      case 'kill':
        return 'rightUp';
      default:
        return '';
    }
  }
}
