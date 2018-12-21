import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authentication";
import { withRouter } from "react-router-dom";
import M from "materialize-css";

class Navbar extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function() {
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
      <ul className="right hide-on-med-and-down">
        <li>
          <Link className="nav-link active" to="/">
            About
          </Link>
        </li>
        <li>
          <Link className="nav-link active" to="/find-players">
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
            className="nav-link active"
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
    );
    const mobileAuthLinks = (
      <ul className="sidenav" id="mobile-auth-links">
        <li>
          <Link className="nav-link" to="/">
            About
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/find-players">
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
    );
    const moblieGuestLinks = (
      <ul className="sidenav" id="mobile-guest-links">
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
    );
    const guestLinks = (
      <ul className="right hide-on-med-and-down">
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
          <div className="" id="navbarSupportedContent">
            {isAuthenticated ? authLinks : guestLinks}
          </div>
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
