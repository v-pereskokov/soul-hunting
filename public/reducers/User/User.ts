import { IS_AUTH, RESET_AUTH } from "../../constants/User/User";

function authentication(state = null, action) {
  switch (action.type) {
    case RESET_AUTH:
      return false;
    case IS_AUTH:
      return action.value;
    default:
      return state;
  }
}

export default authentication;
