import {browserHistory} from 'react-router';

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}
