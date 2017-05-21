import {SET_LOGIN_ERROR} from '../../constants/Form/Form.constants';
import transport from '../../service/Transport/Transoprt';

export function send(url: string, data: any): any {
  return transport.post(url, data);
}

export function setError(error: string): any {
  return {
    type: SET_LOGIN_ERROR,
    error
  };
}
