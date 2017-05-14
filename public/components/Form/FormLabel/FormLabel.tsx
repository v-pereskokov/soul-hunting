import * as React from 'react';

interface Props {
  title: string;
}

export class FormLabel extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <label>
        { this.props.title }
      </label>
    );
  }
}
