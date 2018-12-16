import { APPLY_FOR_GAME, GET_APPLICATIONS } from "./types";
import axios from "axios";

export const createApplicationForGame = ({
  applicant_id,
  applicant_name,
  game_id,
  gamePoster_id
}) => {
  return dispatch => {
    return axios
      .post("/api/applicationForGame/apply", {
        applicant_id,
        applicant_name,
        game_id,
        gamePoster_id
      })
      .then(response => {
        dispatch(createApplicationForGameSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const createApplicationForGameSuccess = data => {
  return {
    type: APPLY_FOR_GAME,
    payload: {
      applicant_id: data._id,
      applicant_name: data._name,
      game_id: data.game_id,
      gamePoster_id: data.gamePoster_id
    }
  };
};

export const fetchApplications = applications => {
  console.log("---fetchApplications---", applications);
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
        console.log("---response from applicationForGame", response);
        dispatch(fetchApplications(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
