import { ACCEPT_APPLICANT, REJECT_APPLICANT } from "./types";
import axios from "axios";

// action creators for dispatching actions for accept or reject applicant
export const updateApprovalAccept = (fixtureID, applicantName) => {
  return dispatch => {
    return axios
      .put("/api/applications/approve", {
        fixtureID,
        applicantName
      })
      .then(response => {
        dispatch(updateApprovalAcceptSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const updateApprovalAcceptSuccess = data => {
  return {
    type: ACCEPT_APPLICANT,
    payload: {
      approved: data.approved
    }
  };
};

export const updateApprovalReject = (fixtureID, applicantName) => {
  return dispatch => {
    return axios
      .put("/api/applications/reject", {
        fixtureID,
        applicantName
      })
      .then(response => {
        dispatch(updateApprovalRejectSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const updateApprovalRejectSuccess = data => {
  return {
    type: REJECT_APPLICANT,
    payload: {
      archive: data.archive
    }
  };
};
