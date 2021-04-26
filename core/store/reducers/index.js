import { combineReducers } from "redux";
import loginReducer from "../../../login/store/loginReducer";
import { combineEpics } from "redux-observable";
import { loginEpic } from "../../../login/store/loginEpic";

export const rootEpic = combineEpics(loginEpic);

export const rootReducer = combineReducers({
  loginReducer
});
