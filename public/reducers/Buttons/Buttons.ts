import { NEXT_BUTTON } from "../../constants/Buttons/Buttons";

const initialState = [
  {
    button: true
  },
  {
    button: false
  }
];

function buttons(state = initialState, action) {
  if (action.type === NEXT_BUTTON) {
    return action.payload;
  }
  return state;
}

export default buttons;
