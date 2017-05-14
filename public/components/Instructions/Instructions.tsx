import * as React from 'react';

export class Instructions extends React.Component<any, any> {
  render() {

    return (
      <div className='blocker'>
        <div className='instructions'>
          <img className='loading' src='/static/images/loading1.png'/>
          <p className='loading-text'>After preloader disappears,
            click on the screen</p>
        </div>
      </div>
    );
  }
}
