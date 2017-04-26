import * as React from 'react';
import {Router, Route, BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import MainTemplate from './teamplates/MainTemplate/MainTemplate';
import Home from "./views/Home/Home";
import SignIn from "./views/SignIn/SignIn";
import SignUp from "./views/SignUp/SignUp";

import * as RoutesMap from './service/RoutesMap/RoutesMap';

import './static/css/reset.scss';
import './static/css/fonts.scss';
import './static/css/main.scss';
import {Provider} from "react-redux";
import store from "./modules/Store/Store";

const history = createBrowserHistory();

export const App = () => (
  <Provider store={ store }>
    <BrowserRouter>
      <Router history={ history }>
        <MainTemplate>
          <Route path={ RoutesMap.HOME } component={ Home }/>
          <Route path={ RoutesMap.SIGNIN } component={ SignIn }/>
          <Route path={ RoutesMap.SIGNUP } component={ SignUp }/>
        </MainTemplate>
      </Router>
    </BrowserRouter>
  </Provider>
);
