import React, { Component } from "react";
import Router from "react-router-dom";

import AllFixturesList from "../containers/AllFixturesList";

export default class FindGame extends Component {
  render() {
    return (
      <div>
        <AllFixturesList {...this.props} />
      </div>
    );
  }
}
