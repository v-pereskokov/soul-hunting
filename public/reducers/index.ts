import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import buttons from './Buttons/Buttons.reducers';
import error from './Form/Form.reducers';
import {authentication} from './User/User.reducers';
import device from './Mobile/Mobile.reducers';
import preloader from './PreLoader/Preloader.reducers';
import {page, users} from './Scoreboard/Scoreboard.reducers';

const reducer = combineReducers({
  authentication,
  buttons,
  page,
  users,
  preloader,
  device,
  error,
  routing: routerReducer,
  form: formReducer
});

export default reducer;
