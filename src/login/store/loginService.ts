import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { AjaxCreationMethod } from 'rxjs/internal/observable/dom/AjaxObservable';
import { LoginCredentials } from './loginTypes';

const login = (credentials: LoginCredentials, ajax: AjaxCreationMethod): Observable<AjaxResponse> => {
  const { username, password } = credentials;

  return ajax({
    url: 'http://localhost:8080/authenticate',
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}}`
    }
  });
};

export { login };
