import * as React from 'react';

import './Form.scss';

interface Props {

}

interface States {
  errorFields: Array<any>;
}

export class Form extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isActive: {}
    }
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}
