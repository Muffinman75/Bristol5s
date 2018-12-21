import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import {
  updateApprovalAccept,
  updateApprovalReject
} from "../actions/approvalForGame";

class ApplicantForGame extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}
  render() {
    return (
      <div>
        {this.props.applications.map(application => {
          if (application.game_id == this.props.fixtureID) {
            return (
              <div className="applicant">
                <h2>
                  {application.applicant_name} Wants To Play In Your Game!
                </h2>
                <button onClick={this.props.updateApprovalAccept}>
                  Accept
                </button>
                <button onClick={this.props.updateApprovalReject}>
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

export default connect(mapStateToProps)(ApplicantForGame);
