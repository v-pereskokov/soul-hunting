import * as React from 'react';

export class LogoBase extends React.Component<any, any> {
  render() {
    return (
      <div className='logo__wrapper animation-open'>
        <div className='logo__header'>
          { this.props.children }
        </div>
      </div>
    );
  }
}
