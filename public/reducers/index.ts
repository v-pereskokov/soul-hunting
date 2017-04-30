import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import buttons from "./Buttons/Buttons";
import authentication from "./User/User";

const reducer = combineReducers({
  authentication,
  buttons,
  routing: routerReducer,
  form: formReducer
});

export default reducer;
