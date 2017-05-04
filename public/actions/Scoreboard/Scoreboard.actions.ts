import transport from '../../service/Transport/Transoprt';

import {ADD_PAGE, ADD_USER} from '../../constants/Scoreboard/Scoreboard.constants';

export function addPage(): any {
  return {
    type: ADD_PAGE
  }
}

export function addUser(user: any): any {
  return {
    type: ADD_USER,
    data: user
  }
}

export function getUsers(page: string): any {
  return transport.get('/users?page=' + page);
}
