import * as React from 'react';

import './StartGameTheme.scss';

export class StartGameTheme extends React.Component<any, any> {
  render() {

    return (
      <div className='counter'>
        <div className='count__parent'>
          <p className='count__parent-child-text1'>MATCH BEGINS IN</p>
          <p className='count__parent-child-text2'>10</p>
        </div>
      </div>
    );
  }
}
