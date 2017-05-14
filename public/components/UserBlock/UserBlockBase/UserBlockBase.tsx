import * as React from 'react';

export class UserBlockBase extends React.Component<any, any> {
  render() {
    return (
      <div className='userblock'>
        { this.props.children }
      </div>
    );
  }
}
