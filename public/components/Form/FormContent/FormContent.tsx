import * as React from 'react';

interface Props {
  content?: Array<any>;
}

export class FormContent extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <ul>
        { this.props.content }
      </ul>
    );
  }
}
