import * as React from 'react';

import './PreLoader.scss';

export class PreLoader extends React.Component<void, void> {
  constructor() {
    super();
  }

  render() {
    return (
      <div className='pre-loader__wrapper'>
        <div className="pre-loader">
          <div className="line square"/>
          <div className="line square2"/>
          <div className="line square3"/>
          <div className="line square4"/>
        </div>
      </div>
    );
  }
}
