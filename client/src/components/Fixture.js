import React, { Component } from "react";
import ApplicantForGame from "../components/ApplicantForGame";

class Fixture extends Component {
  render() {
    return (
      <div className="card-panel cyan darken-4 l5">
        <div className="card-content white-text center-align">
          <p className="white-text flow-text">
            Date: {this.props.fixture.date}
          </p>
          <p className="white-text flow-text">
            Time: {this.props.fixture.time}
          </p>
          <p className="white-text flow-text">
            No. of players STILL needed: {this.props.fixture.playersReq}
          </p>
          <p className="white-text flow-text">
            Cost To Play: {this.props.fixture.cost}
          </p>
          <p className="white-text flow-text">
            Pitch No: {this.props.fixture.pitchNo}
          </p>
          <p className="white-text flow-text">
            Venue: {this.props.fixture.venue}
          </p>
          <p className="white-text flow-text">
            Message For Applicants: {this.props.fixture.comments}
          </p>
          <ApplicantForGame
            fixtureID={this.props.fixture._id}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default Fixture;
