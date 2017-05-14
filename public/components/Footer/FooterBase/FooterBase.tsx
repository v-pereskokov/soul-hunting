import * as React from 'react';

export class FooterBase extends React.Component<any, any> {
  render() {
    return (
      <div className='footer'>
        { this.props.children }
      </div>
    );
  }
}
