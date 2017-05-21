import {SET_LOGIN_ERROR} from '../../constants/Form/Form.constants';

function error(state: string = '', action: any) {
  if (action.type === SET_LOGIN_ERROR) {
    return action.error;
  }

  return state;
}

export default error;
