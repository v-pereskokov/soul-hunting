import * as React from 'react';

import Background from '../Background/Background';
import {connect} from 'react-redux';

import './Information.scss';

interface Props {
  device?: boolean;
}

class Information extends React.Component<Props, any> {
  render() {
    const classes = `information__wrapper-form ${this.props.device ? '' : 'mobile__info'}`;

    return (
      <div className='wrapper__information'>
        <Background />
        <div className={ classes }>
          <div className='information__form'>
            <div className='information__form-header'>
              <span>Soul Hunting</span>
            </div>
              <form className='information__form-content' name='{data.title}'>
                { this.props.children }
              </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    device: state.device
  }
};

export default connect(mapStateToProps)(Information as any);
