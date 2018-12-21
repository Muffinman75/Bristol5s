import React, { Component, PropTypes } from "react";
import ApplicantForGame from "../components/ApplicantForGame";
import { connect } from "react-redux";

class Fixture extends Component {
  render() {
    return (
      <div>
        <p className="card-panel teal lighten-3">
          Date: {this.props.fixture.date}
        </p>
        <p className="card-panel teal lighten-3">
          Time: {this.props.fixture.time}
        </p>
        <p className="card-panel teal lighten-3">
          PlayersReq: {this.props.fixture.playersReq}
        </p>
        <p className="card-panel teal lighten-3">
          Cost: {this.props.fixture.cost}
        </p>
        <p className="card-panel teal lighten-3">
          PitchNo: {this.props.fixture.pitchNo}
        </p>
        <p className="card-panel teal lighten-3">
          Venue: {this.props.fixture.venue}
        </p>
        <p className="card-panel teal lighten-3">
          Comments: {this.props.fixture.comments}
        </p>
        <ApplicantForGame fixtureID={this.props.fixture._id} />
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

export default Fixture;
