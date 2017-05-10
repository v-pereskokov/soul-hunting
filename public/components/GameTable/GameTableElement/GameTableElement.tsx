import * as React from 'react';

export class GameTableElement extends React.Component<void, void> {
  render() {
    return (
      <td>
        { this.props.item }
      </td>
    );
  }
}
