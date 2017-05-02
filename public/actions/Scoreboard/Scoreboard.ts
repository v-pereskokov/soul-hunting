import transport from "../../service/Transport/Transoprt";

export function addPage() {
  return {
    type: 'ADD_PAGE'
  }
}

export function addUser(user) {
  return {
    type: 'ADD_USER',
    data: user
  }
}

export function getUsers(page) {
  return transport.get('/users?page=' + page);
}
