import * as React from 'react';
import {connect} from 'react-redux';

interface Props {
  device?: boolean;
}

class TableBase extends React.Component<Props, any> {
  render() {
    const classes = `scoreboard ${this.props.device ? '' : 'mobile__table__scoreboard'}`;

    return (
      <table className={ classes }>
        { this.props.children }
      </table>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    device: state.device
  }
};

export default connect(mapStateToProps)(TableBase as any);
