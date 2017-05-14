import * as React from 'react';

interface Props {
  name: string;
  type: string;
  placeholder: string;
  input?: any;
}

export class FormInput extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <input
        name={ this.props.name }
        type={ this.props.type }
        placeholder={ this.props.placeholder }
        { ...this.props.input }
      />
    );
  }
}
