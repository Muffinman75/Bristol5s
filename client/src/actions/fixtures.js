import axios from "axios";
import {
  ADD_GAME,
  UPDATE_GAME,
  GET_GAME,
  GET_GAME_BY_ID,
  REMOVE_GAME
} from "./types";

const fixtureApiUrl = "localhost:8000/api/fixtures";

export const createFixture = ({
  date,
  time,
  playersReq,
  cost,
  venue,
  pitchNo,
  comments
}) => {
  return dispatch => {
    return axios
      .post(`${fixtureApiUrl}/add-game`, {
        date,
        time,
        playersReq,
        cost,
        venue,
        pitchNo,
        comments
      })
      .then(response => {
        dispatch(createFixtureSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const createFixtureSuccess = data => {
  return {
    type: ADD_GAME,
    payload: {
      date: data.date,
      time: data.time,
      playersReq: data.playersReq,
      cost: data.cost,
      venue: data.venue,
      pitchNo: data.pitchNo,
      comments: data.comments
    }
  };
};

export const updateFixture = ({
  date,
  time,
  playersReq,
  cost,
  venue,
  pitchNo,
  comments
}) => {
  return dispatch => {
    return axios
      .put(`${fixtureApiUrl}/update-game`, {
        date,
        time,
        playersReq,
        cost,
        venue,
        pitchNo,
        comments
      })
      .then(response => {
        dispatch(updateFixtureSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const updateFixtureSuccess = data => {
  return {
    type: UPDATE_GAME,
    payload: {
      date: data.date,
      time: data.time,
      playersReq: data.playersReq,
      cost: data.cost,
      venue: data.venue,
      pitchNo: data.pitchNo,
      comments: data.comments
    }
  };
};

export const removeFixtureSuccess = fixtureId => {
  return {
    type: REMOVE_GAME,
    payload: {
      fixtureId
    }
  };
};

export const removeFixture = gameId => {
  return dispatch => {
    return axios
      .put(`${fixtureApiUrl}/remove-game`)
      .then(response => {
        dispatch(removeFixtureSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fetchFixtures = fixtures => {
  return {
    type: GET_GAME,
    fixtures
  };
};

export const fetchAllFixtures = () => {
  return dispatch => {
    return axios
      .get(fixtureApiUrl)
      .then(response => {
        dispatch(fetchFixtures(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fixturesById = id => {
  return {
    type: GET_GAME_BY_ID,
    payload: {
      id
    }
  };
};

export const fetchFixturesById = () => {
  return dispatch => {
    return axios
      .get(fixtureApiUrl)
      .then(response => {
        dispatch(fixturesById(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
