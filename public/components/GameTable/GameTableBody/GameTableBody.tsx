import * as React from 'react';

export class GameTableBody extends React.Component<void, void> {
  render() {
    return (
      <tbody>
        { this.props.content }
      </tbody>
    );
  }
}
