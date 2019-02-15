import axios from "axios";
import {
  ADD_GAME,
  UPDATE_GAME,
  GET_GAME,
  GET_GAME_BY_ID,
  REMOVE_GAME
} from "./types";

// action creators for dispatching actions for CRUD operations for a fixture
export const createFixture = (fixture, cb) => {
  return dispatch => {
    return axios
      .post("/api/fixtures/add-game", {
        date: fixture.date,
        time: fixture.time,
        playersReq: fixture.playersReq,
        cost: fixture.cost,
        venue: fixture.venue,
        pitchNo: fixture.pitchNo,
        comments: fixture.comments
      })
      .then(response => {
        if (response.data.hasOwnProperty("message")) {
          cb(false, response.data.message);
        } else {
          dispatch(createFixtureSuccess(response.data));
          cb(true, response.data);
        }
      })
      .catch(error => {
        cb(false, "Can't add a fixture that is in the past!");
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

export const updateFixture = (fixture, cb) => {
  return dispatch => {
    return axios
      .put("/api/fixtures/update-game", {
        id: fixture._id,
        date: fixture.date,
        time: fixture.time,
        playersReq: fixture.playersReq,
        cost: fixture.cost,
        venue: fixture.venue,
        pitchNo: fixture.pitchNo,
        comments: fixture.comments
      })
      .then(response => {
        if (response.data.hasOwnProperty("message")) {
          cb(false, response.data.message);
        } else {
          dispatch(updateFixtureSuccess(response.data));
          cb(true, response.data);
        }
      })
      .catch(error => {
        cb(false, "Can't update to a fixture that is in the past!");
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

export const removeFixtureSuccess = fixture => {
  return {
    type: REMOVE_GAME,
    payload: {
      fixture
    }
  };
};

export const removeFixture = fixture => {
  return dispatch => {
    return axios
      .put("/api/fixtures/remove-game", { _id: fixture._id })
      .then(response => {
        dispatch(removeFixtureSuccess(fixture));
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
      .get("/api/fixtures/display-games")
      .then(response => {
        dispatch(fetchFixtures(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fixtureById = id => {
  return {
    type: GET_GAME_BY_ID,
    payload: {
      id
    }
  };
};

export const fetchFixtureById = () => {
  return dispatch => {
    let user_id = localStorage.getItem("user_id");
    return axios
      .get(`/api/fixtures/display-games/${user_id}`)
      .then(response => {
        dispatch(fixtureById(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};
