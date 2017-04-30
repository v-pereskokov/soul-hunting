import { browserHistory } from 'react-router';
import transport from "../../service/Transport/Transoprt";

import { LOGIN_REQUEST, LOGIN_FAIL } from "../../constants/User/User";

export function handleSignIn() {
  return dispatch => {
    dispatch({
      type: LOGIN_REQUEST
    });

    transport.post('/signup', JSON.stringify({
      'login': 'asdfdsf',
      'email': 'adsfasdf@mail.eq',
      'password': 'qqqqqqqq'
    }))
      .then(response => {
        if (+response.status === 200) {
          browserHistory.push('/');
        } else {
          dispatch({
            type: LOGIN_FAIL,
            error: true
          })
        }
      });
  }
}
