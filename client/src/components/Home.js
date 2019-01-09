import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import UserFixturesPostedList from "../containers/UserFixturesPostedList";

export default class Home extends Component {
  render() {
    let userName = localStorage.getItem("user_name");
    return (
      <div style={{ marginTop: "50px" }}>
        <p>Welcome, {userName}!</p>
        <UserFixturesPostedList />
      </div>
    );
  }
}
