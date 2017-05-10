import * as React from 'react';

interface Props {
  nickname: string;
}

export class UserBlockNickName extends React.Component<Props, void> {
  render() {
    return (
      <p className='userblock__username'>
        { this.props.nickname }
      </p>
    );
  }
}
