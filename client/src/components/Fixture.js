import React, { Component, PropTypes } from "react";
import ApplicationForGame from "../components/ApplicationForGame";
import { connect } from "react-redux";
import { fetchAllFixtures } from "../actions/fixtures";
import { fetchAllApplications } from "../actions/applicationForGame";

class Fixture extends Component {
  componentDidMount() {
    console.log("Fixture, props:", this.props);
    this.props.fetchAllFixtures();
  }
  render() {
    return (
      <div>
        <p>Date: {this.props.fixture.date}</p>
        <p>Time: {this.props.fixture.time}</p>
        <p>PlayersReq: {this.props.fixture.playersReq}</p>
        <p>Cost: {this.props.fixture.cost}</p>
        <p>PitchNo: {this.props.fixture.pitchNo}</p>
        <p>Venue: {this.props.fixture.venue}</p>
        <p>Comments: {this.props.fixture.comments}</p>
        <ApplicationForGame />
      </div>
    );
  }
}

// Fixture.propTypes = {
// };

// export default ({
//   fixture: { _id, date, time, playersReq, cost, pitchNo, venue, comments },
//   onRemove
// }) => {
// };
const mapStateToProps = state => {
  return {
    applications: state.application
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllFixtures: () => {
      dispatch(fetchAllFixtures);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Fixture);
