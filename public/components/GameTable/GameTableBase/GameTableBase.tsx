import * as React from 'react';

export class GameTableBase extends React.Component<void, void> {
  render() {
    return (
      <table className='gameTable'>
        { this.props.children }
      </table>
    );
  }
}
