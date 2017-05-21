import {createStore, applyMiddleware, compose } from 'redux';
import reducer from '../reducers/index';
import thunk from 'redux-thunk';

const store: any = createStore(
  reducer,
  compose(applyMiddleware(thunk)),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
