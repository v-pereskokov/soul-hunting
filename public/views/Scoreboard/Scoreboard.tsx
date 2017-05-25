import * as React from 'react';
import {browserHistory} from 'react-router'
import {connect} from 'react-redux';

import {Button} from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import Background from '../../components/Background/Background';
import {togglePreloader} from '../../actions/PreLoader/PreLoader.actions';
import {addPage, addUser, getUsersAction} from '../../actions/Scoreboard/Scoreboard.actions';

import './Scoreboard.scss';

const header = [{
  title: '#'
}, {
  title: 'Username'
}, {
  title: 'Singleplayer score'
}, {
  title: 'Multiplayer score'
}];

interface Props {
  getUsers: (page: number) => void;
  isAuthenticated: boolean;
  device?: boolean;
  users: any;
  page: number;
}

class Scoreboard extends React.Component<Props, void> {
  _users: Array<Array<any>>;

  componentWillMount() {
    this.props.getUsers(this.props.page);
  }

  render() {
    const {isAuthenticated, users, device} = this.props;
    const classes = `table ${device ? '' : 'mobile__table'}`;

    this._users = this._getUsers(users);

    return (
      <div className='wrapper__scoreboard'>
        <Background closed={ true }/>
        { !isAuthenticated ?
          browserHistory.push('/')
          :
          <div className={ classes }>
            <Table header={ header } content={ this._users }/>
            <div className='more__button'>
              <Button
                text='More'
                isActive={ true }
                click={ () => {
                  this.props.getUsers(this.props.page);
                  this._users = this._getUsers(users);
                }
                }
              />
            </div>
          </div>
        }
      </div>
    );
  }

  _getUsers(users: Array<Array<any>>) {
    const userArray = this._makeUsersArray(users);

    userArray.sort((lhs, rhs) => {
      return rhs[1] - lhs[1];
    });

    return userArray;
  }

  _makeUsersArray(users: any) {
    let array: Array<any> = [];

    for (let user of users) {
      array.push([user.login, user.sScore, user.mScore]);
    }

    return array;
  }
}

const mapStateToProps = (state: any) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    device: state.device,
    page: state.page,
    users: state.users
  }
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getUsers: (page: number = 1) => {
      dispatch(togglePreloader());

      return getUsersAction(page)
        .then((response: any) => {
          return response.json();
        })
        .then((data: any) => {
          dispatch(addPage());
          dispatch(addUser(data));
          dispatch(togglePreloader());
        });
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard as any);
