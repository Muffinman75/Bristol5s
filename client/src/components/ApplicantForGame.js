import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  updateApprovalAccept,
  updateApprovalReject
} from "../actions/approvalForGame";

class ApplicantForGame extends Component {
  updateApprovalAccept = (fixtureID, applicantName) => {
    console.log("b4 invoke approve:");
    this.props.updateApprovalAccept(fixtureID, applicantName);
    console.log("after invoke approve:");
    alert(`You have approved
      ${applicantName}
      play in your game!`);
    console.log("props in approve:", this.props);
    //this.props.history.push("/home");
    window.location.href = "/home";
  };

  updateApprovalReject = (fixtureID, applicantName) => {
    this.props.updateApprovalReject(fixtureID, applicantName);
    alert(`${applicantName} will NOT be playing in your game!`);
    //this.props.history.push("/home");
    window.location.href = "/home";
  };

  render() {
    return (
      <div>
        {this.props.applications.map(application => {
          if (
            application.archive === false &&
            application.game_id === this.props.fixtureID &&
            application.applicant_id !== localStorage.getItem("user_id")
          ) {
            let applicantName = application.applicant_name;
            let fixtureID = this.props.fixtureID;
            return (
              <div className="applicant" key={application._id}>
                <h4 className="card-panel red darken-1">
                  {application.applicant_name} Wants To Play In Your Game!
                </h4>
                <button
                  className="btn teal darken-3"
                  onClick={() =>
                    this.updateApprovalAccept(fixtureID, applicantName)
                  }
                  style={{ marginRight: "14px" }}
                >
                  <i className="material-icons right">check</i>
                  Accept
                </button>
                <button
                  className="btn teal darken-3"
                  onClick={() =>
                    this.updateApprovalReject(fixtureID, applicantName)
                  }
                  style={{ marginRight: "14px" }}
                >
                  <i className="material-icons right">clear</i>
                  Reject
                </button>
              </div>
            );
          }
        })}
      </div>
    );
  }
}
ApplicantForGame.propTypes = {};

const mapStateToProps = state => {
  return {
    applications: state.application
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateApprovalAccept: (fixtureID, applicantName) => {
      console.log("in mapDispatchToProps approve");
      dispatch(updateApprovalAccept(fixtureID, applicantName));
    },
    updateApprovalReject: (fixtureID, applicantName) => {
      dispatch(updateApprovalReject(fixtureID, applicantName));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantForGame);
