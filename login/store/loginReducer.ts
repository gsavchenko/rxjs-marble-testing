import { LOGIN_SUCCESS, LOGIN_FAIL, LoginActionTypes } from './loginTypes';

const initialState = {
  loggedIn: false
}

export default function loginReducer(state = initialState, action: LoginActionTypes) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true
      }
    case LOGIN_FAIL:
      return {
        ...state,
        loggedIn: false
      }
    default:
      return state;
  }
}
