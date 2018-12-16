import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import UserFixturesPostedList from "../containers/UserFixturesPostedList";
import ApplicationsForGamesList from "../containers/ApplicationsForGamesList";

export default class Home extends Component {
  render() {
    let userName = localStorage.getItem("user_name");
    return (
      <React.Fragment>
        <p>Welcome, {userName}!</p>
        <ApplicationsForGamesList />
        <UserFixturesPostedList />
      </React.Fragment>
    );
  }
}
