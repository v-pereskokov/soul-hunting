import {createStore} from 'redux';
import reducer from "../reducers/combineReducer.reducer";

const store = createStore(
  reducer
);

export default store;
