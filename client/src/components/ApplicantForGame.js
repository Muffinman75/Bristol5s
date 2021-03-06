import React, { Component } from "react";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  updateApprovalAccept,
  updateApprovalReject
} from "../actions/approvalForGame";

class ApplicantForGame extends Component {
  updateApprovalAccept = (fixtureID, applicantName) => {
    confirmAlert({
      title: `Accept ${applicantName} For Your Game!`,
      message: `You definitely want ${applicantName} to play? Are you sure?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("b4 invoke approve:");
            this.props.updateApprovalAccept(fixtureID, applicantName);
            //this.props.history.push("/home");
            window.location.href = "/home";
          }
        },
        {
          label: "No",
          onClick: () => {
            this.props.history.push("/home");
            //window.location.href = "/home";
          }
        }
      ]
    });
  };

  updateApprovalReject = (fixtureID, applicantName) => {
    confirmAlert({
      title: `Reject ${applicantName} For Your Game!`,
      message: `Really? You want to reject ${applicantName}? Are you sure? `,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            this.props.updateApprovalReject(fixtureID, applicantName);
            //this.props.history.push("/home");
            window.location.href = "/home";
          }
        },
        {
          label: "No",
          onClick: () => {
            this.props.history.push("/home");
            //window.location.href = "/home";
          }
        }
      ]
    });
  };

  render() {
    return (
      <div>
        {this.props.applications.map(application => {
          if (
            application.applicant_id !== localStorage.getItem("user_id") &&
            application.archive === false &&
            application.game_id === this.props.fixtureID
          ) {
            let applicantName = application.applicant_name;
            let fixtureID = this.props.fixtureID;
            return (
              <div className="applicant" key={application._id}>
                <h4 className="card-panel red accent-2 center-align">
                  <span className="applicantHeading">
                    Hi! I'm {application.applicant_name}, I Want To Play In Your
                    Game!
                  </span>
                </h4>
                <div className="row center-align">
                  <button
                    className="btn light-blue darken-1 waves"
                    onClick={() =>
                      this.updateApprovalAccept(fixtureID, applicantName)
                    }
                    style={{ marginRight: "14px", marginBottom: "12px" }}
                  >
                    <i className="material-icons right">check</i>
                    Accept
                  </button>
                  <button
                    className="btn light-blue darken-1 waves"
                    onClick={() =>
                      this.updateApprovalReject(fixtureID, applicantName)
                    }
                    style={{ marginRight: "14px", marginBottom: "12px" }}
                  >
                    <i className="material-icons right">clear</i>
                    Reject
                  </button>
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    applications: state.application
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateApprovalAccept: (fixtureID, applicantName) => {
      console.log("in mapDispatchToProps approves");
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
