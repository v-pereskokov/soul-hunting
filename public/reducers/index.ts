import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';
import buttons from "./Buttons/Buttons";
import authentication from "./User/User";
import {page, users} from "./Scoreboard/Scoreboard";

const reducer = combineReducers({
  authentication,
  buttons,
  page,
  users,
  routing: routerReducer,
  form: formReducer
});

export default reducer;
