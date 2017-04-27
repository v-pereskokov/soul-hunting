import * as React from 'react';
import {Button} from "../../components/Button/Button";

import './Home.scss';
import {connect} from "react-redux";
import { Link } from 'react-router'

class Home extends React.Component<void, void> {
  render() {
    return (
      <div className="wrapper__form">
        <div className="wrapper__main__form">
          <div className='main__form'>
            <Link to='/signin'>
              <Button text='SIGN IN' isActive={ true }/>
            </Link>
            <Link to='/signup' key="101010110">
              <Button text='REGISTER' isActive={ false }/>
            </Link>
            {/*{*/}
              {/*isLoggedIn ? (*/}
                {/*<div>*/}
                  {/*<Link to='/signin'>*/}
                    {/*<Button text='Game' isActive={ true }/>*/}
                  {/*</Link>*/}
                  {/*<Link to='/signup'>*/}
                    {/*<Button text='logout' isActive={ false }/>*/}
                  {/*</Link>*/}
                {/*</div>*/}
              {/*) : (*/}
                {/*<div>*/}
                  {/*<Link to='/signin'>*/}
                    {/*<Button text='SIGN IN' isActive={ true }/>*/}
                  {/*</Link>*/}
                  {/*<Link to='/signup'>*/}
                    {/*<Button text='REGISTER' isActive={ false }/>*/}
                  {/*</Link>*/}
                {/*</div>*/}
              {/*)*/}
            {/*}*/}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {state}
};

export default connect(mapStateToProps)(Home);
