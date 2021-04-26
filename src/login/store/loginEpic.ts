import { LoginActionTypes, LOGIN } from './loginTypes';
import { Epic } from 'redux-observable';
import { mergeMap, filter, map, catchError } from 'rxjs/operators';
import { loginSuccess, loginFail } from './loginActions';
import { isOfType } from 'typesafe-actions';
import { login } from './loginService';
import { of } from 'rxjs';

export const loginEpic: Epic<LoginActionTypes> = (action$, state$, { ajax }) => action$.pipe(
  filter(isOfType(LOGIN)),
  mergeMap(action => login(action.payload.credentials, ajax).pipe(
    map(ajaxResponseObject => loginSuccess(ajaxResponseObject.response)),
    catchError((ajaxResponseObject => of(loginFail(ajaxResponseObject.response))))
  ))
)
