import transport from "../../service/Transport/Transoprt";

import {NEXT_BUTTON} from "../../constants/Buttons/Buttons";

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

export function checkAuthentication() {
  return transport.get('/cur-user');
}
