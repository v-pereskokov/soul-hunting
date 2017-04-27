import {formReducer} from "redux-form";
import {combineReducers} from "redux";
import data from '../reducers/Test/Test';
import { routerReducer } from 'react-router-redux'

const reducer = combineReducers({
  data,
  routing: routerReducer
});

export default reducer;
