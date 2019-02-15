import { APPLY_FOR_GAME, GET_APPLICATIONS } from "./types";
import axios from "axios";

// action creators for dispatching actions for create application and get all applications
export const createApplicationForGame = (application, cb) => {
  return dispatch => {
    return axios
      .post("/api/applications/apply", {
        applicant_id: application.applicant_id,
        applicant_name: application.applicant_name,
        game_id: application.game_id,
        gamePoster_id: application.gamePoster_id
      })
      .then(response => {
        if (response.data.hasOwnProperty("message")) {
          cb(false, response.data.message);
        } else {
          dispatch(createApplicationForGameSuccess(response.data));
          cb(true, response.data);
        }
      })
      .catch(error => {
        cb(false, "You have already applied to this game!");
      });
  };
};

export const createApplicationForGameSuccess = data => {
  return {
    type: APPLY_FOR_GAME,
    payload: {
      applicant_id: data.applicant_id,
      applicant_name: data.applicant_name,
      game_id: data.game_id,
      gamePoster_id: data.gamePoster_id
    }
  };
};

export const fetchApplications = applications => {
  return {
    type: GET_APPLICATIONS,
    applications
  };
};

export const fetchAllApplications = () => {
  return dispatch => {
    return axios
      .get("/api/applications/applicationForGame")
      .then(response => {
        dispatch(fetchApplications(response.data));
      })
      .catch(error => {
        console.log("UserFix error:", error);
        throw error;
      });
  };
};
