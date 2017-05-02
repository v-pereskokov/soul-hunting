import * as React from 'react';

interface Props {
  index?: any;
}

export class TableRow extends React.Component<Props, void> {
  render() {
    return (
      <tr key={ this.props.index }>
        { this.props.children }
      </tr>
    );
  }
}
