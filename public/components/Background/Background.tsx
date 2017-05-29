import * as React from 'react';
import {Link} from 'react-router';

import './Background.scss';
import {connect} from 'react-redux';

interface Props {
  closed?: boolean;
  device?: boolean;
}

class Background extends React.Component<Props, void> {
  render() {
    const classes = `close ${this.props.device ? '' : 'mobile__close'}`;

    return (
      <div>
        { this.props.closed && <Link to='/'>
          <span className={ classes }>
            &times;
          </span>
        </Link>
        }
        <div className='back'/>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    device: state.device
  }
};

export default connect<{}, {}, Props>(mapStateToProps)(Background as any);
