const initialState = {
  isAuthenticated: false,
  user: {}
};

const isEmpty = (word) => {
  return word.trim().length === 0;
};

export default function authentication(state = initialState, action = {}) {
  switch(action.type) {
    case 'SET_CURRENT_USER':
      console.log('here');
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
    default: return state;
  }
}

export default authentication;
