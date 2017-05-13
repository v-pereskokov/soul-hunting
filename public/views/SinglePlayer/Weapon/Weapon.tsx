import * as React from 'react';

export class Weapon extends React.Component<any, any> {
  render() {

    return (
      <div className='weapon__wrapper'>
        <img className='weapon__wrapper-img' src='/static/gameSource/weapon.png'/>
      </div>
    );
  }
}
