import * as React from 'react';
import {Link} from 'react-router';

interface Props {
  pathTo?: string;
}

export class Linked extends React.Component<Props, any> {
  render() {
    const {pathTo} = this.props;

    return (
      <div>
        { pathTo ?
          <Link to={pathTo}>
            {this.props.children}
          </Link>
          : <div>
            {this.props.children}
          </div>
        }
      </div>
    );
  }
}
