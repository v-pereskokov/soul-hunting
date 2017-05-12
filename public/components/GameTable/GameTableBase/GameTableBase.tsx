import * as React from 'react';

export class GameTableBase extends React.Component<any, any> {
  render() {
    return (
      <table className='gameTable'>
        { this.props.children }
      </table>
    );
  }
}
