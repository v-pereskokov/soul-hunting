import * as React from 'react';
import {Link} from 'react-router';

import './Background.scss';

interface Props {
  closed?: boolean;
}

export class Background extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        { this.props.closed && <Link to='/'>
          <span className='close'>
            &times;
          </span>
        </Link>
        }
        <div className='back'>
        </div>
      </div>
    );
  }
}
