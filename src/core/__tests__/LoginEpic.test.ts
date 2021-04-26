import { TestScheduler } from "rxjs/testing";
import { loginEpic } from "../../login/store/loginEpic";
import { ActionsObservable, StateObservable } from "redux-observable";
import { AjaxResponse } from "rxjs/ajax";
import { BehaviorSubject } from "rxjs";
import {
  LOGIN,
  LoginAction,
  LoginFailAction,
  LoginSuccessAction,
  LOGIN_FAIL,
  LOGIN_SUCCESS
} from "../../login/store/loginTypes";

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

describe("Test LoginEpic", () => {
  it("should return loginSuccess action on login", () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const mockUser = {
        id: "",
        username: "",
        password: "",
        userType: "",
        createdAt: 0,
        updatedAt: 0
      };

      const mockLoginAction: LoginAction = {
        type: LOGIN,
        payload: { credentials: { username: "test", password: "test" } }
      };
      const mockResponse: AjaxResponse = {
        originalEvent: new Event("event"),
        xhr: new XMLHttpRequest(),
        request: {},
        status: 200,
        response: mockUser,
        responseText: "something",
        responseType: "object"
      };
      const mockLoginSuccess: LoginSuccessAction = {
        type: LOGIN_SUCCESS,
        payload: { user: mockUser }
      };

      const actionValues = {
        a: mockLoginAction,
        b: mockLoginSuccess
      };
      const responseValue = {
        a: mockResponse
      };

      const actionInput$ = hot("-a", actionValues);
      const action$ = new ActionsObservable(actionInput$);

      const state$ = new StateObservable(new BehaviorSubject(null), null);

      const responseInput$ = cold("--a", responseValue);
      const dependencies = { ajax: () => responseInput$ };

      const output$ = loginEpic(action$, state$, dependencies);
      expectObservable(output$).toBe("---b", actionValues);
    });
  });

  it("should return loginFail action on error observable", () => {
    testScheduler.run(({ hot, cold, expectObservable }) => {
      const error = { name: "test", message: "test" };

      const mockLoginAction: LoginAction = {
        type: LOGIN,
        payload: { credentials: { username: "test", password: "test" } }
      };
      const mockResponse: AjaxResponse = {
        originalEvent: new Event("event"),
        xhr: new XMLHttpRequest(),
        request: {},
        status: 401,
        response: error,
        responseText: "something",
        responseType: "object"
      };
      const mockLoginFail: LoginFailAction = {
        type: LOGIN_FAIL,
        payload: { error }
      };

      const actionValues = {
        a: mockLoginAction,
        b: mockLoginFail
      };

      const actionInput$ = hot("-a", actionValues);
      const action$ = new ActionsObservable(actionInput$);

      const state$ = new StateObservable(new BehaviorSubject(null), null);

      const responseInput$ = cold("--#", undefined, mockResponse); // TODO: figure out why '#' adds 3 frames
      const dependencies = { ajax: () => responseInput$ };

      const output$ = loginEpic(action$, state$, dependencies);
      expectObservable(output$).toBe("------b", actionValues);
    });
  });
});
