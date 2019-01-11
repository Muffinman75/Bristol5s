import { ACCEPT_APPLICANT, REJECT_APPLICANT } from "./types";
import axios from "axios";

export const updateApprovalAccept = fixtureID => {
  return dispatch => {
    return axios
      .put("/api/applications/approve", { fixtureID })
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

export const updateApprovalReject = () => {
  return dispatch => {
    return axios
      .put("/api/applications/reject")
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
