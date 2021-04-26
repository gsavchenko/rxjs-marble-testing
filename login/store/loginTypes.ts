export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export interface User {
  id: string;
  username: string;
  password: string;
  userType: string;
  createdAt: number;
  updatedAt: number;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginAction {
  type: typeof LOGIN;
  payload: { credentials: LoginCredentials };
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: { user: User };
}

export interface LoginFailAction {
  type: typeof LOGIN_FAIL;
  payload: { error: NodeJS.ErrnoException };
}

export type LoginActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginFailAction;
