import * as React from 'react';

import './Health.scss';

export class Health extends React.Component<any, any> {
  render() {

    return (
      <div className='wrapper__health'>
        <p className='wrapper__health-text'>100 HP</p>
        <div className='wrapper__health-red'/>
      </div>
    );
  }
}
