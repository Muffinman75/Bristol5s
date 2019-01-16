import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import M from "materialize-css";

class Navbar extends Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this).addEventListener(
      "material-icons",
      this._handleEvent
    );
    (function() {
      const sidenav = document.querySelector(".sidenav");
      console.log(sidenav.dataset);
      //const nav = document.querySelector("#" + sidenav.dataset.target);
      //const nav = document.querySelector("#mobile-guest-links");
      sidenav.addEventListener("click", function() {
        sidenav.classList.toggle("is-active");
        //nav.classList.toggle("is-active");
      });
    })();
    document.addEventListener("DOMContentLoaded", function() {
      console.log("inside listener:");
      var elems = document.querySelectorAll(".sidenav");
      var instances = M.Sidenav.init(elems);
    });
  }
  onLogout(e) {
    e.preventDefault();
    this.props.logoutUser(this.props.history);
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authLinks = (
      <div className="authLinks">
        <ul className="right hide-on-med-and-down">
          <li>
            <Link className="nav-link active" to="/">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link active" to="/find-game">
              Find a Game
            </Link>
          </li>
          <li>
            <Link className="nav-link active" to="/add-game">
              Find Players
            </Link>
          </li>
          <li>
            <button
              className="nav-link active btn"
              onClick={this.onLogout.bind(this)}
            >
              <img
                src={user.avatar}
                alt={user.name}
                title={user.name}
                className="rounded-circle"
                style={{ width: "25px", marginRight: "5px" }}
              />
              Logout
            </button>
          </li>
        </ul>

        <ul className="sidenav" style={{ width: "60%" }} id="mobile-auth-links">
          <li>
            <Link className="nav-link" to="/">
              About
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/find-game">
              Find a Game
            </Link>
          </li>
          <li>
            <Link className="nav-link" to="/add-game">
              Find Players
            </Link>
          </li>
          <li>
            <a
              href="#"
              className="nav-link waves-effect waves-light btn-small"
              onClick={this.onLogout.bind(this)}
            >
              <img
                src={user.avatar}
                alt={user.name}
                title={user.name}
                className="rounded-circle right"
                style={{ width: "25px", marginRight: "5px" }}
              />
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
    const guestLinks = (
      <div className="guestLinks">
        <ul
          className="sidenav"
          style={{ width: "60%" }}
          id="mobile-guest-links"
        >
          <li>
            <Link className="nav-link active" to="/">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Become a Member
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Sign In
            </Link>
          </li>
        </ul>

        <ul className="right hide-on-med-and-down">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/register">
              Become a Member
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" to="/login">
              Sign In
            </Link>
          </li>
        </ul>
      </div>
    );
    return (
      <nav className="nav-wraper indigo">
        <div className="container">
          <Link className="brand-logo" to="/home">
            Bristol5s
          </Link>
          <div>
            {isAuthenticated ? (
              <Link
                className="sidenav-trigger"
                to="#"
                data-target="mobile-auth-links"
              >
                <i className="material-icons">menu</i>
              </Link>
            ) : (
              <Link
                className="sidenav-trigger"
                to="#"
                data-target="mobile-guest-links"
              >
                <i className="material-icons">menu</i>
              </Link>
            )}
          </div>
          <div className="">{isAuthenticated ? authLinks : guestLinks}</div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));
