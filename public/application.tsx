import * as React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';

import MainTemplate from './teamplates/MainTemplate/MainTemplate';
import Home from "./views/Home/Home";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";

import * as RoutesMap from './service/RoutesMap/RoutesMap';

import './static/css/reset.scss';
import './static/css/fonts.scss';
import './static/css/main.scss';

import store from './store/Store';

export const App = () => (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path={ RoutesMap.HOME } component={ MainTemplate }>
        <IndexRoute component={ Home }/>
        <Route path={ RoutesMap.SIGNIN } component={ SignIn }/>
        <Route path={ RoutesMap.SIGNUP } component={ SignUp }/>
      </Route>
    </Router>
  </Provider>
);
