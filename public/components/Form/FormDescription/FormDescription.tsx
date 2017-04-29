import * as React from 'react';

interface Props {
  touched?: boolean;
  description?: string;
  error?: string;
}

export class FormDescription extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const {touched, description, error} = this.props;

    return (
      <span
        className={ touched && error && 'errorText' }
      >
        {
          touched && error
            ?
            error
            :
            description
        }
      </span>
    );
  }
}
