import { ACCEPT_APPLICANT, REJECT_APPLICANT } from "./types";
import axios from "axios";

export const updateApprovalAccept = (fixtureID, applicantName) => {
  console.log("approve b4", fixtureID, applicantName);
  return dispatch => {
    console.log("approve after", fixtureID, applicantName);
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
  console.log("approve b4", fixtureID, applicantName);
  return dispatch => {
    console.log("approve after", fixtureID, applicantName);
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
