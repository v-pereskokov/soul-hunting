import isEmpty from '../../service/Validators/CheckUser/CheckUser';

const initialState = {
  isAuthenticated: false,
  user: {}
};

export function authentication(state = initialState, action = {}) {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: isEmpty(action.user),
        user: action.user
      };
    default:
      return state;
  }
}
