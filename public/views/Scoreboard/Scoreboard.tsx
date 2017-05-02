import * as React from 'react';
import {Link} from 'react-router'
import {connect} from "react-redux";

import {Button} from "../../components/Button/Button";
import {Table} from "../../components/Table/Table";
import {Background} from "../../components/Background/Background";
import Random from '../../service/Random/Random';
import transport from "../../service/Transport/Transoprt";

import './Scoreboard.scss';

const header = [{
  title: '#'
}, {
  title: 'Username'
}, {
  title: 'Score'
}];

class Scoreboard extends React.Component<void, void> {
  componentWillMount() {
    this.props.getUsers(this.props.page);
  }

  render() {
    const {isAuthenticated, users} = this.props;

    this._users = this._costyl(users);

    return (
      <div className="wrapper__scoreboard">
        <Background />
        { !isAuthenticated ?
          browserHistory.push('/')
          :
          <div className="table">
            <Table header={ header } content={ this._users }/>
            <div className="more__button">
              <Button
                text="More"
                isActive={ true }
                click={ () => {
                  this.props.getUsers(this.props.page);
                  this._users = this._costyl(users);
                }
                }
              />
            </div>
          </div>
        }
      </div>
    );
  }

  _costyl(users) {
    const userArray = this._makeUsersArray(users);

    userArray.sort((lhs, rhs) => {
      return rhs[1] - lhs[1];
    });

    return userArray;
  }

  _makeUsersArray(users) {
    let array = [];

    for (let user of users) {
      array.push([user.login, String(Random(1000, 10000))]);
    }

    return array;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    page: state.page,
    users: state.users
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getUsers: (page = 1) => {
      dispatch({
        type: 'TOGGLE__PRELOADER'
      });

      return transport.get('/users?page=' + page)
        .then(response => {
          return response.json();
        })
        .then(data => {
          dispatch({
            type: 'ADD_PAGE',
          });

          dispatch({
            type: 'ADD_USER',
            data
          });

          dispatch({
            type: 'TOGGLE__PRELOADER'
          });
        });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
