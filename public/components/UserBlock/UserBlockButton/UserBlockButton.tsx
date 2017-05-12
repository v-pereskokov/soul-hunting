import * as React from 'react';
import {Button} from '../../Button/Button';

interface Props {
  click: () => any;
}

export class UserBlockButton extends React.Component<Props, void> {
  render() {
    return (
      <div className='userblock__button'>
        <Button
          text='LOGOUT'
          isActive={ false }
          click={ this.props.click }
          size='s'
        />
      </div>
    );
  }
}
