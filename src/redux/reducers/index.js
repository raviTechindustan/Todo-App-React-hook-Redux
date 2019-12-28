
import { combineReducers } from 'redux';
import todoReducer from './todo';
import auth from '../../Auth/reducers';

const rootReducer = combineReducers({
  todoReducer,
  auth
});

export default rootReducer;