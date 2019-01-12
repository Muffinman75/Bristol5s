import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import UserFixturesPostedList from "../containers/UserFixturesPostedList";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div style={{ marginTop: "50px" }}>
        <UserFixturesPostedList {...this.props} />
      </div>
    );
  }
}
// make a dispatch in componentDidMount to get all fixtures from the store
const mapStateToProps = state => {
  return {
    fixtures: state.fixture
  };
};

export default connect(mapStateToProps)(Home);
