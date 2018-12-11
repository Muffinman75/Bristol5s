import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import fixtureReducer from "./fixtureReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  fixture: fixtureReducer
});
