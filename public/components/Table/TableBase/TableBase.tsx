import * as React from 'react';

export class TableBase extends React.Component<any, any> {
  render() {
    return (
      <table className='scoreboard'>
        { this.props.children }
      </table>
    );
  }
}
