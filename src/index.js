import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {ConnectedRouter} from 'connected-react-router'
import store, { history } from './store';
import App from './containers/App';
import 'sanitize.css/sanitize.css';
import './styles/index.scss';

const target = document.querySelector('.app');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <App history={history} />
    </ConnectedRouter>
  </Provider>,
  target
);
