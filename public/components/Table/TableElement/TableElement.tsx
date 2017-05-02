import * as React from 'react';

export class TableElement extends React.Component<void, void> {
  render() {
    return (
      <td>
        { this.props.item }
      </td>
    );
  }
}
