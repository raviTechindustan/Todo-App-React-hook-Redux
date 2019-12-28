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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const store = createStore(Reducer, applyMiddleware(thunkMiddleware));
const options = {
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  transition: 'scale'
}
ReactDOM.render(
  <Provider store={store}>
    <Routers />
    <ToastContainer />
  </Provider>,
  document.getElementById('root')
);
serviceWorker.unregister();
