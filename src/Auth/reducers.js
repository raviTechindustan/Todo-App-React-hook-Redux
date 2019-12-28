import {
  INITILIZE_AUTH,
  LOGGED_IN,
  SIGNUP,
  LOGOUT
} from './actionTypes';
import { getObject, setObject } from '../utils';

const initialState = {
  registeredUsers: [],
  user: {}
}

export default function (state = { ...initialState}, action) {
  switch (action.type) {
    case INITILIZE_AUTH:
      const data = getObject('auth');
      return { ...state, ...data };

    case LOGGED_IN:
      const user = action.user || {};
      setObject('auth', { user, registeredUsers: state.registeredUsers });
      return { ...state, user }

    case SIGNUP:
      setObject('auth', { user: {}, registeredUsers: [...state.registeredUsers, { ...action.user }] });
      return { ...state, registeredUsers: [...state.registeredUsers, { ...action.user }]}

    case LOGOUT:
      setObject('auth', { user: {}, registeredUsers: state.registeredUsers });
      return { ...state, user: {} }
  
    default:
      return state
  }
}