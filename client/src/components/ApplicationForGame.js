import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { fetchAllApplications } from "../actions/applicationForGame";

class ApplicationForGame extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    fetchAllApplications();
    console.log("line 34 applications list:", this.props);
  }
  render() {
    return (
      <div>
        <h2>Someone Wants To Play In Your Game!</h2>
        <p>Applicant: {} who, this peep?</p>
        <button>Accept</button>
        <button>Reject</button>
      </div>
    );
  }
}
ApplicationForGame.propTypes = {};

const mapStateToProps = state => {
  return {
    applications: state.application
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllApplications: () => {
      dispatch(fetchAllApplications);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicationForGame);
