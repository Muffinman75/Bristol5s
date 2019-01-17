import React, { Component } from "react";
import { connect } from "react-redux";
import UserFixturesPostedList from "../containers/UserFixturesPostedList";

class Home extends Component {
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <UserFixturesPostedList {...this.props} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    fixtures: state.fixture
  };
};

export default connect(mapStateToProps)(Home);
