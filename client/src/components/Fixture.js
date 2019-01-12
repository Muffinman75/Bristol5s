import React, { Component, PropTypes } from "react";
import ApplicantForGame from "../components/ApplicantForGame";
import { connect } from "react-redux";

class Fixture extends Component {
  render() {
    return (
      <div className="card-panel blue-grey darken-1">
        <div className="card-content white-text">
          <p className="">Date: {this.props.fixture.date}</p>
          <p className="">Time: {this.props.fixture.time}</p>
          <p className="">
            Num of players needed: {this.props.fixture.playersReq}
          </p>
          <p className="">Cost To Play: {this.props.fixture.cost}</p>
          <p className="">Pitch No: {this.props.fixture.pitchNo}</p>
          <p className="">Venue: {this.props.fixture.venue}</p>
          <p className="">Comments: {this.props.fixture.comments}</p>
          <ApplicantForGame
            fixtureID={this.props.fixture._id}
            {...this.props}
          />
        </div>
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
