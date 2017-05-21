import {ADD_PAGE, ADD_USER} from '../../constants/Scoreboard/Scoreboard.constants';
import transport from '../../service/Transport/Transoprt';

export function addPage(): any {
  return {
    type: ADD_PAGE
  };
}

export function addUser(user: any): any {
  return {
    data: user,
    type: ADD_USER
  };
}

export function getUsersAction(page: number): any {
  return transport.get('/users?page=' + page);
}
