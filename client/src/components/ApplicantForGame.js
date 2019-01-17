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
      message: `You definately want ${applicantName} to play? Are you sure?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            console.log("b4 invoke approve:");
            this.props.updateApprovalAccept(fixtureID, applicantName);
            console.log("after invoke approve:");
            alert(`OK! ${applicantName} will see you at the game!`);
            console.log("props in approve:", this.props);
            //this.props.history.push("/home");
            window.location.href = "/home";
          }
        },
        {
          label: "No",
          onClick: () => {
            console.log("after invoke approve:");
            alert(
              `You have chosen NOT to accept ${applicantName} for your game!`
            );
            console.log("props in approve:", this.props);
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
            alert(`You have rejected ${applicantName} for your game!`);
            //this.props.history.push("/home");
            window.location.href = "/home";
          }
        },
        {
          label: "No",
          onClick: () => {
            this.props.history.push("/home");
            //window.location.href = "/home";
            alert(`You have not rejected ${applicantName} for your game!`);
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
            application.archive === false &&
            application.game_id === this.props.fixtureID &&
            application.applicant_id !== localStorage.getItem("user_id")
          ) {
            let applicantName = application.applicant_name;
            let fixtureID = this.props.fixtureID;
            return (
              <div className="applicant" key={application._id}>
                <h4 className="card-panel red accent-2 center-align">
                  <span className="applicantHeading">
                    {application.applicant_name} Wants To Play In Your Game!
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
