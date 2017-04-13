import * as React from 'react';

export class Logo extends React.Component<void, void> {
  render() {
    return (
      <div className='wrapper__main__wrapper animation-open'>
        <div className='wrapper__main__header'>
          SOUL HUNTING
          <p className='wrapper__main__header-register'>&#174;</p>
        </div>
      </div>
    );
  }
}
