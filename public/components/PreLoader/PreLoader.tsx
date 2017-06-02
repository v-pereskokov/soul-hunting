import * as React from 'react';
import {connect} from 'react-redux';

import './PreLoader.scss';

interface Props {
  show: boolean;
}

class PreLoader extends React.Component<Props, void> {
  render() {
    const {show} = this.props;

    const style = {
      display: show ? 'block' : 'none'
    };

    return (
      <div
        className='pre-loader__wrapper'
        style={style}>
        <span className='loader-block'/>
        <span className='loader-block'/>
        <span className='loader-block'/>
        <span className='loader-block'/>
        <span className='loader-block'/>
        <span className='loader-block'/>
        <span className='loader-block'/>
        <span className='loader-block'/>
        <span className='loader-block'/>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    show: state.preloader
  }
};

export default connect(mapStateToProps)(PreLoader as any);
