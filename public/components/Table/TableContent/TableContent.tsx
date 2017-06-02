import * as React from 'react';
import {TableRow} from '../TableRow/TableRow';
import {TableElement} from '../TableElement/TableElement';
import {TableBody} from '../TableBody/TableBody';
import {connect} from 'react-redux';

interface Props {
  content: Array<any>;
  device?: boolean;
}

class TableContent extends React.Component<Props, any> {
  render() {
    const content = this.getContent();

    return (
      <TableBody content={ content }/>
    );
  }

  getContent() {
    if (this.props.device) {
      return this.props.content.map((item, index) => {
        return (
          <TableRow key={ index }>
            <TableElement item={ index + 1 }/>
            <TableElement item={ item[0] }/>
            <TableElement item={ item[1] }/>
            <TableElement item={ item[2] }/>
          </TableRow>
        );
      });
    } else {
      return this.props.content.map((item, index) => {
        return (
          <TableRow key={ index }>
            <TableElement item={ item[0] }/>
            <TableElement item={ item[1] }/>
          </TableRow>
        );
      });
    }
  }
}

const mapStateToProps = (state: any) => {
  return {
    device: state.device
  }
};

export default connect<{}, {}, Props>(mapStateToProps)(TableContent);
