import * as React from 'react';
import {Router, Route, BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import {MainTemplate} from './teamplates/MainTemplate/MainTemplate';
import {Home} from "./views/Home/Home";
import {SignIn} from "./views/SignIn/SignIn";
import {SignUp} from "./views/SignUp/SignUp";
import {Scoreboard} from "./views/Scoreboard/Scoreboard";

import * as RoutesMap from './service/RoutesMap/RoutesMap';

import './static/css/reset.scss';
import './static/css/fonts.scss';
import './static/css/main.scss';

const history = createBrowserHistory();

export const App = () => (
  <BrowserRouter>
    <Router history={ history }>
      <MainTemplate>
        <Route path={ RoutesMap.HOME } component={ Home }/>
        <Route path={ RoutesMap.SIGNIN } component={ SignIn }/>
        <Route path={ RoutesMap.SIGNUP } component={ SignUp }/>
        <Route path={ RoutesMap.SCOREBOARD } component={ Scoreboard }/>
      </MainTemplate>
    </Router>
  </BrowserRouter>
);
