import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer, rootEpic } from "./reducers";
import { createEpicMiddleware } from "redux-observable";
import { ajax } from "rxjs/ajax";

const epicMiddleware = createEpicMiddleware({ dependencies: { ajax: ajax } });
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
}
