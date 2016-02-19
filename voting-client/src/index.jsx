import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import { setClientId, setState, setConnectionState } from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import MyApp from './components/App';
import { VotingContainer } from './components/Voting';
import { ResultsContainer } from './components/Results';
import { hashHistory } from 'react-router'
import {EntryListContainer} from './components/EntryList';

require('./style.css');

const socket = io(`${location.protocol}//${location.hostname}:8090`);

socket.on('state', state => store.dispatch(setState(state))
);

[
  'connect',
  'connect_error',
  'connect_timeout',
  'reconnect',
  'reconnecting',
  'reconnect_error',
  'reconnect_failed'
].forEach(ev =>
  socket.on(ev, () => store.dispatch(setConnectionState(ev, socket.connected)))
);

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(socket)
)(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));

render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route component={MyApp}>
        <Route path="/" component={VotingContainer} />
        <Route path="/results" component={ResultsContainer} />
        <Route path="/list" component={EntryListContainer} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
