import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import PostedGame from "./PostedGame";

export default class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <p>Welcome, User!</p>
        {/* <PostedGame /> */}
      </React.Fragment>
    );
  }
}
