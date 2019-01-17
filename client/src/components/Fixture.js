import React, { Component } from "react";
import ApplicantForGame from "../components/ApplicantForGame";

class Fixture extends Component {
  render() {
    return (
      <div className="card-panel light-green accent-1 l5">
        <div className="card-content white-text center-align">
          <p
            className="light-blue-text darken-4 flow-text"
            style={{
              "text-decoration": "underline",
              "text-decoration-color": "white"
            }}
          >
            Date: {this.props.fixture.date}
          </p>
          <p
            className="light-blue-text darken-4 flow-text"
            style={{
              "text-decoration": "underline",
              "text-decoration-color": "white"
            }}
          >
            Time: {this.props.fixture.time}
          </p>
          <p
            className="light-blue-text darken-4 flow-text"
            style={{
              "text-decoration": "underline",
              "text-decoration-color": "white"
            }}
          >
            No. of players STILL needed: {this.props.fixture.playersReq}
          </p>
          <p
            className="light-blue-text darken-4 flow-text"
            style={{
              "text-decoration": "underline",
              "text-decoration-color": "white"
            }}
          >
            Cost To Play: {this.props.fixture.cost}
          </p>
          <p
            className="light-blue-text darken-4 flow-text"
            style={{
              "text-decoration": "underline",
              "text-decoration-color": "white"
            }}
          >
            Pitch No: {this.props.fixture.pitchNo}
          </p>
          <p
            className="light-blue-text darken-4 flow-text"
            style={{
              "text-decoration": "underline",
              "text-decoration-color": "white"
            }}
          >
            Venue: {this.props.fixture.venue}
          </p>
          <p
            className="light-blue-text darken-4 flow-text"
            style={{
              "text-decoration": "underline",
              "text-decoration-color": "white"
            }}
          >
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
