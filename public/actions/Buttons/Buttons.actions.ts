import {NEXT_BUTTON} from '../../constants/Buttons/Buttons.constants';

export function setActive(button1, button2, button3, current) {
  return {
    type: NEXT_BUTTON,
    payload: [
      {
        current
      },
      {
        button: button1
      },
      {
        button: button2
      },
      {
        button: button3
      }
    ]
  }
}
