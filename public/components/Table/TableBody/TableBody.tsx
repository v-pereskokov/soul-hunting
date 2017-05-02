import * as React from 'react';

export class TableBody extends React.Component<void, void> {
  render() {
    return (
      <tbody>
        { this.props.content }
      </tbody>
    );
  }
}
