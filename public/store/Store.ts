import {createStore, applyMiddleware } from 'redux';
import reducer from "../reducers/index";
import thunk from 'redux-thunk';

const store: any = createStore(
  reducer,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
