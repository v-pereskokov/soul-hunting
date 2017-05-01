export function page(state = 1, action = {}) {
  switch(action.type) {
    case 'ADD_PAGE':
      return ++state;
    default:
      return state;
  }
}

export function users (state = [], action) {
  switch (action.type) {
    case 'ADD_USER':
      return [
        ...state,
        ...action.data
      ];
    default:
      return state
  }
}
