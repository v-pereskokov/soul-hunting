import {SET_DEVICE} from '../../constants/Mobile/Mobile.constants';

export function setDevice(device) {
  return {
    type: SET_DEVICE,
    device
  }
}
