import * as React from 'react';
import {Link} from 'react-router';

import {Button} from '../Button/Button';

import './Back.scss';

interface Props {
  path: string;
}

export class Back extends React.Component<Props, void> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div className='button__back'>
        <Link to={ this.props.path }>
          <Button
            text='BACK'
            isActive={ false }
          />
        </Link>
      </div>
    );
  }
}
