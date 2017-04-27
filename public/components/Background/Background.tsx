import * as React from 'react';
import { Link } from 'react-router';

import './Background.scss';

export class Background extends React.Component<void, void> {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Link to='/'>
          <span className='close'>
            &times;
          </span>
        </Link>
        <div className='back'>
        </div>
      </div>
    );
  }
}
