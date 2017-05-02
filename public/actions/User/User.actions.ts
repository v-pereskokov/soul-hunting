import transport from '../../service/Transport/Transoprt';
import {SET_CURRENT_USER} from '../../constants/User/User.constants';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function checkAuthentication() {
  return transport.get('/cur-user');
}

export function logoutUser() {
  return transport.post('/logout');
}
