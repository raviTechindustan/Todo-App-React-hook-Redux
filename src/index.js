import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Router';
import * as serviceWorker from './serviceWorker';
import './assets/styles/index.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import Reducer from './redux/reducers'
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

const store = createStore(Reducer, applyMiddleware(thunkMiddleware));

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
