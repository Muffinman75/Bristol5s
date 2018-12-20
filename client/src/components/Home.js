import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import UserFixturesPostedList from "../containers/UserFixturesPostedList";

export default class Home extends Component {
  render() {
    let userName = localStorage.getItem("user_name");
    return (
      <div>
        <p>Welcome, {userName}!</p>
        <UserFixturesPostedList />
      </div>
    );
  }
}
