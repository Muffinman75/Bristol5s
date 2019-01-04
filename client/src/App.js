import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authentication";

import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Login from "./components/Login";
import Landing from "./components/Landing";
import Home from "./components/Home";
import FindGame from "./components/FindGame";
import UpdateGame from "./components/UpdateGame";

import CreateGame from "./containers/CreateGame";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <div className="container">
              <Route exact path="/" component={Landing} />
              <Route path="/home" component={Home} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/find-players" component={FindGame} />
              <Route path="/add-game" component={CreateGame} />
              <Route path="/update-game/:id" component={UpdateGame} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
