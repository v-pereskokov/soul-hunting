import * as React from 'react';

interface Props {
  item: any;
}

export class GameTableElement extends React.Component<Props, void> {
  render() {
    return (
      <td>
        { this.props.item }
      </td>
    );
  }
}
