import * as React from 'react';

interface Props {
  content: Array<any>;
}

export class TableBody extends React.Component<Props, void> {
  render() {
    return (
      <tbody>
        { this.props.content }
      </tbody>
    );
  }
}
