import { browserHistory } from 'react-router';
import transport from "../../service/Transport/Transoprt";

export function setCurrentUser(user) {
  return {
    type: 'SET_CURRENT_USER',
    user
  };
}

export function logout() {
  return dispatch => {
    transport.post('/logout')
      .then(response => {
        if (!response.status === 200) {
          localStorage.removeItem('token');
          dispatch(setCurrentUser({}));
        }
      });
  }
}

export function login(data) {
  return dispatch => {
    return transport.post('/cur-user', data)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        // localStorage.setItem('token', token);
        // dispatch(setCurrentUser(token));
      });
  }
}
