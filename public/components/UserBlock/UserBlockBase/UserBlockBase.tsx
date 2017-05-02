import * as React from 'react';

export class UserBlockBase extends React.Component<void, void> {
  render() {
    return (
      <div className='userblock'>
        { this.props.children }
      </div>
    );
  }
}
