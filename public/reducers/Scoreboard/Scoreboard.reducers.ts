export function page(state: number = 1, action: any = {}) {
  switch (action.type) {
    case 'ADD_PAGE':
      return ++state;
    default:
      return state;
  }
}

export function users(state: Array<any> = [], action: any) {
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
