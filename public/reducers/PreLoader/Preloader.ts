export default function preloader(state = false, action = {}) {
  switch(action.type) {
    case 'TOGGLE__PRELOADER':
      return !state;
    default:
      return state;
  }
}

export default preloader;
