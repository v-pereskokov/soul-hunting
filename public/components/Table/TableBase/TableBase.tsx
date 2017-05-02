import * as React from 'react';

export class TableBase extends React.Component<void, void> {
  render() {
    return (
      <table className='scoreboard'>
        { this.props.children }
      </table>
    );
  }
}
