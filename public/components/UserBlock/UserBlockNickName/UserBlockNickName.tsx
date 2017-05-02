import * as React from 'react';

export class UserBlockNickName extends React.Component<void, void> {
  render() {
    return (
      <p className='userblock__username'>
        { this.props.nickname }
      </p>
    );
  }
}
