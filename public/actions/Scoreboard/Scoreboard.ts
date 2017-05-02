import transport from "../../service/Transport/Transoprt";

import {ADD_PAGE, ADD_USER} from "../../constants/Scoreboard/Scoreboard.constants";

export function addPage() {
  return {
    type: ADD_PAGE
  }
}

export function addUser(user) {
  return {
    type: ADD_USER,
    data: user
  }
}

export function getUsers(page) {
  return transport.get('/users?page=' + page);
}
