import {TOGGLE__PRELOADER} from '../../constants/PreLoader/PreLoader.constants';

export default function preloader(state = false, action = {}) {
  switch(action.type) {
    case TOGGLE__PRELOADER:
      return !state;
    default:
      return state;
  }
}
