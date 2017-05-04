import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form';

import buttons from './Buttons/Buttons.reducers';
import {authentication} from './User/User.reducers';
import {page, users} from './Scoreboard/Scoreboard.reducers';
import preloader from './PreLoader/Preloader.reducers';
import device from './Mobile/Mobile.reducers';

const reducer = combineReducers({
  authentication,
  buttons,
  page,
  users,
  preloader,
  device,
  routing: routerReducer,
  form: formReducer
});

export default reducer;
