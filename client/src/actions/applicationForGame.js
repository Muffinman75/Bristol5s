import { APPLY_FOR_GAME } from "./types";
import axios from "axios";

const applicationApiUrl = "localhost:8000/applicationForGame";

export const createApplicationForGame = ({
  applicant_id,
  game_id,
  gamePoster_id
}) => {
  return dispatch => {
    return axios
      .post(`${applicationApiUrl}/apply`, {
        applicant_id,
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
      game_id: data.game_id,
      gamePoster_id: data.gamePoster_id
    }
  };
};
