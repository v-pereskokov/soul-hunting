import * as React from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import {Provider} from 'react-redux';

import * as RoutesMap from './service/RoutesMap/RoutesMap';
import store from './store/Store';

import MainTemplate from './templates/MainTemplate/MainTemplate';
import Home from './views/Home/Home';
import SignIn from './views/SignIn/SignIn';
import SignUp from './views/SignUp/SignUp';
import Scoreboard from './views/Scoreboard/Scoreboard';
import About from './views/About/About';
import {Error} from './views/Error/Error';
import Game from './views/Game/Game';
import SinglePlayer from './views/Game/SinglePlayer/SinglePlayer';

import {setCurrentUser} from './actions/User/User.actions';
import {setDevice} from './actions/Mobile/Mobile.actions';
import {startServiceWorker} from './service/ServiceWorker/ServiceWorker';
import Device from './service/Device/Device';

import './static/css/reset.scss';
import './static/css/fonts.scss';
import './static/css/main.scss';

if (localStorage.token) {
  store.dispatch(setCurrentUser(localStorage.token));
}

store.dispatch(setDevice(new Device().isDesktop()));

// startServiceWorker();

export const App = () => (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path={ RoutesMap.HOME } component={ MainTemplate }>
        <IndexRoute component={ Home }/>
        <Route path={ RoutesMap.SIGNIN } component={ SignIn }/>
        <Route path={ RoutesMap.SIGNUP } component={ SignUp }/>
        <Route path={ RoutesMap.SCOREBOARD } component={ Scoreboard }/>
        <Route path={ RoutesMap.ABOUT } component={ About }/>
        <Route path={ RoutesMap.GAME } component={ Game }/>
        <Route path={ RoutesMap.SINGLEPLAYER } component={ SinglePlayer } />
        <Route path='*' component={ Error }/>
      </Route>
    </Router>
  </Provider>
);
