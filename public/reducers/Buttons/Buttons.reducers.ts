import {NEXT_BUTTON} from '../../constants/Buttons/Buttons.constants';

const initialState: Array<any> = [
  {
    current: '1',
  },
  {
    button: true
  },
  {
    button: false
  },
  {
    button: false
  }
];

function buttons(state: Array<any> = initialState, action: any) {
  if (action.type === NEXT_BUTTON) {
    return action.payload;
  }
  return state;
}

export default buttons;
