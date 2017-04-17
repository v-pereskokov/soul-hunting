import * as React from 'react';

import './Logo.scss';

export class Logo extends React.Component<void, void> {
  render() {
    return (
      <div className='logo__wrapper animation-open'>
        <div className='logo__header'>
          SOUL HUNTING
          <p className='logo__header-register'>&#174;</p>
        </div>
      </div>
    );
  }
}
