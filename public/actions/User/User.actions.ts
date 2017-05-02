import {SET_CURRENT_USER} from '../../constants/User/User.constants';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}
