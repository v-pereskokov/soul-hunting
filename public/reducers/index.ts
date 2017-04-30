import {combineReducers} from "redux";
import signIn from '../reducers/SignIn/SignIn';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import buttons from "./Buttons/Buttons";

const reducer = combineReducers({
  signIn,
  buttons,
  routing: routerReducer,
  form: formReducer
});

export default reducer;
