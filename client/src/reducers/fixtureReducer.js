import {
  ADD_GAME,
  UPDATE_GAME,
  GET_GAME,
  GET_GAME_BY_ID,
  REMOVE_GAME
} from "../actions/types";

const initialState = [];

export default function fixtureReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_GAME:
      return [...state, action.payload];
    case UPDATE_GAME:
      return [...state, action.payload];
    case REMOVE_GAME:
      return state.filter(
        fixture => fixture._id !== action.payload.fixture._id
      );
    case GET_GAME:
      return action.fixtures;
    case GET_GAME_BY_ID:
      let user_id = localStorage.getItem("user_id");
      return state.filter(fixture => fixture.user_id === user_id);
    default:
      return state;
  }
}
