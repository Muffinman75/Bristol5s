import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  updateApprovalAccept,
  updateApprovalReject
} from "../actions/approvalForGame";

class ApplicantForGame extends Component {
  render() {
    return (
      <div>
        {this.props.applications.map(application => {
          if (
            application.game_id === this.props.fixtureID &&
            application.applicant_id !== localStorage.getItem("user_id")
          ) {
            return (
              <div className="applicant" key={application._id}>
                <h4 className="card-panel red darken-1 pulse">
                  {application.applicant_name} Wants To Play In Your Game!
                </h4>
                <button
                  className="btn teal darken-3"
                  onClick={this.props.updateApprovalAccept}
                  style={{ marginRight: "14px" }}
                >
                  <i className="material-icons right">check</i>
                  Accept
                </button>
                <button
                  className="btn teal darken-3"
                  onClick={this.props.updateApprovalReject}
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
    updateApprovalAccept: () => {
      dispatch(updateApprovalAccept());
    },
    updateApprovalReject: () => {
      dispatch(updateApprovalReject());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplicantForGame);
