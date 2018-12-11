import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import { fetchAllFixtures } from "./actions/fixtures";

store.dispatch(fetchAllFixtures());

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
