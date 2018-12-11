import { ACCEPT_APPLICANT, REJECT_APPLICANT } from "./types";
import axios from "axios";

const approvalApiUrl = "localhost:8000/approvalForGame";

export const updateApprovalAccept = ({ approved }) => {
  return dispatch => {
    return axios
      .put(`${approvalApiUrl}/accept`, { approved })
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
      .put(`${approvalApiUrl}/reject`, { archive })
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
