import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import reduxLogger from "redux-logger";

const inititalState = {};

const store = createStore(
  rootReducer,
  inititalState,
  compose(
    applyMiddleware(thunk, reduxLogger),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
