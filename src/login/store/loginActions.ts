import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LoginActionTypes,
  LoginCredentials,
  User
} from './loginTypes';

export function login(credentials: LoginCredentials): LoginActionTypes {
  return {
    type: LOGIN,
    payload: { credentials }
  }
}

export function loginSuccess(user: User): LoginActionTypes {
  return {
    type: LOGIN_SUCCESS,
    payload: { user }
  }
}

export function loginFail (error: Error): LoginActionTypes {
  return {
    type: LOGIN_FAIL,
    payload: { error }
  };
}