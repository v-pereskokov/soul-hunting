import * as React from 'react';

interface Props {
  text?: string;
}

export class FormError extends React.Component<Props, void> {
  constructor(props: Props =
                {
                  text: ''
                }) {
    super(props);
  }

  render() {
    return (
      <span className="errorText__response">
        { this.props.text }
      </span>
    );
  }
}
