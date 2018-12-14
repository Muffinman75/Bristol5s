import { ACCEPT_APPLICANT, REJECT_APPLICANT } from "./types";
import axios from "axios";

export const updateApprovalAccept = ({ approved }) => {
  return dispatch => {
    return axios
      .put("/api/approvalForGame/accept", { approved })
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

export const updateApprovalReject = ({ archive }) => {
  return dispatch => {
    return axios
      .put("/api/approvalForGame/reject", { archive })
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
