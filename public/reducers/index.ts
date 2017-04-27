import {combineReducers} from "redux";
import signIn from '../reducers/SignIn/SignIn';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  signIn,
  routing: routerReducer,
  form: formReducer
});

export default reducer;
