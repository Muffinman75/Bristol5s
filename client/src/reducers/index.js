import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import fixtureReducer from "./fixtureReducer";
import applicationReducer from "./applicationReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  fixture: fixtureReducer,
  application: applicationReducer
});
