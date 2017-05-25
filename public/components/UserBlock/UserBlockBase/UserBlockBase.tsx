import * as React from 'react';
import {connect} from 'react-redux';

interface Props {
  device?: boolean;
}

class UserBlockBase extends React.Component<Props, any> {
  render() {
    const classes = `userblock ${this.props.device ? '' : 'mobile__userblock'}`;
    
    return (
      <div className={ classes }>
        { this.props.children }
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    device: state.device
  }
};


export default connect(mapStateToProps)(UserBlockBase as any);
