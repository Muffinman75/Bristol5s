import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import FixtureList from "../containers/FixtureList";

export default class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <p>Welcome, User!</p>
        <FixtureList />
      </React.Fragment>
    );
  }
}
