import * as React from 'react';
import {connect} from 'react-redux';

interface Props {
  device?: boolean;
}

class LogoBase extends React.Component<Props, any> {
  render() {
    const classes = `logo__wrapper ${this.props.device ? '' : 'mobile__logo'} animation-open`;

    return (
      <div className={ classes }>
        <div className='logo__header'>
          { this.props.children }
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

export default connect(mapStateToProps)(LogoBase as any);
