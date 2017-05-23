import * as React from 'react';

import './Weapon.scss';

export class Weapon extends React.Component<any, any> {
  render() {

    return (
      <div className='weapon__wrapper'>
        <img className='weapon__wrapper-img swaying' src='/static/gameSource/weapon.png'/>
      </div>
    );
  }
}
