const initialState = {
  isAuthenticated: false,
  user: {}
};

const isEmpty = (word) => {
  if (word) {
    if (word.trim().length !== 0) {
      return true;
    }
  }

  return false;
};

export default function authentication(state = initialState, action = {}) {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      return {
        isAuthenticated: isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
}

export default authentication;
