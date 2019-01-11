import React, { Component } from "react";

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
