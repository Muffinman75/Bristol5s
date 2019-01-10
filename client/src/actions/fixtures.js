import axios from "axios";
import {
  ADD_GAME,
  UPDATE_GAME,
  GET_GAME,
  GET_GAME_BY_ID,
  REMOVE_GAME
} from "./types";

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
        console.log(response.status);
        if (response.data.hasOwnProperty("message")) {
          //something went wrong
          cb(false, response.data.message);
        } else {
          dispatch(createFixtureSuccess(response.data));
          cb(true, response.data);
        }
      })
      .catch(error => {
        cb(false, "There is already a fixture on that day and time");
        //throw error;
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
      .put("/api/fixtures/update-game", {
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

export const removeFixtureSuccess = fixture => {
  return {
    type: REMOVE_GAME,
    payload: {
      fixture
    }
  };
};

export const removeFixture = fixture => {
  console.log("Remove Fixture action:", fixture);
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
  console.log("fixture here");
  return dispatch => {
    console.log("fixture here2");
    return axios
      .get("/api/fixtures/display-games")
      .then(response => {
        console.log("fixture response");
        dispatch(fetchFixtures(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

export const fixtureById = id => {
  //let user_id = localStorage.getItem("user_id");
  return {
    type: GET_GAME_BY_ID,
    payload: {
      id
    }
  };
};

export const fetchFixtureById = () => {
  console.log("fixtureById inside action");
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
