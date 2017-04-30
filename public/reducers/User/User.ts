import { LOGIN_REQUEST,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_SUCCESS } from
  "../../constants/User/User";

function authentication(state = {
                isFetching: false,
                isAuthenticated: false
              }, action) {
  switch (action.type) {
    default:
      return state
  }
}

export default authentication;
