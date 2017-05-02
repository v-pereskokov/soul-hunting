import * as React from 'react';

export class FooterBase extends React.Component<void, void> {
  render() {
    return (
      <div className='footer'>
        { this.props.children }
      </div>
    );
  }
}
