import {formReducer} from "redux-form";
import {combineReducers} from "redux";
import data from '../reducers/Test/Test';

const reducer = combineReducers({
  data,
  form: formReducer
});

export default reducer;
