import {
  INITILIZE_AUTH,
  LOGGED_IN,
  SIGNUP,
  LOGOUT
} from './actionTypes';
import { generateRandomString } from '../utils';

export function initialize() {
  return (dispatch) => {
    dispatch({
      type: INITILIZE_AUTH,
    })
  }
}

export function login(user) {
  let token = generateRandomString();
  return (dispatch) => {
    dispatch({
      type: LOGGED_IN,
      user: {
        ...user,
        token
      }
    })
  }
}

export function signup(user) {
  return (dispatch) => {
    dispatch({
      type: SIGNUP,
      user
    })
  }
}

export function logout() {
  return (dispatch) => {
    dispatch({
      type: LOGOUT
    })
  }
}
