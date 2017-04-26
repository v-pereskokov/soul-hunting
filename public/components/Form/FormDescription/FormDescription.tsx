import * as React from 'react';

interface Props {
  text?: string;
}

export class FormDescription extends React.Component<Props, void> {
  constructor(props: Props =
                {
                  text: 'Text'
                }) {
    super(props);
  }

  render() {
    return (
      <span>
        { this.props.text }
      </span>
    );
  }
}
