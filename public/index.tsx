import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
import SinglePlayer from './views/SinglePlayer/SinglePlayer';
import MultiPlayer from './views/MultiPlayer/MultiPlayer';

import musicService from './service/MusicService/MusicService';
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

// musicService.startBackground();

// startServiceWorker();

const App = () => (
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path={ RoutesMap.HOME } component={ MainTemplate as any }>
        <IndexRoute component={ Home }/>
        <Route path={ RoutesMap.SIGNIN } component={ SignIn as any }/>
        <Route path={ RoutesMap.SIGNUP } component={ SignUp as any }/>
        <Route path={ RoutesMap.SCOREBOARD } component={ Scoreboard as any }/>
        <Route path={ RoutesMap.ABOUT } component={ About as any }/>
        <Route path={ RoutesMap.GAME } component={ Game as any }/>
        <Route path={ RoutesMap.SINGLEPLAYER } component={ SinglePlayer as any } />
        <Route path={ RoutesMap.MULTIPLAYER } component={ MultiPlayer as any } />
        <Route path='*' component={ Error as any }/>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
