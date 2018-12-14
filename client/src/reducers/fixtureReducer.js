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
      return state.filter(fixture => fixture._id !== action.payload.fixtureId);
    case GET_GAME:
      console.log("fixture reducer:", action.fixtures);
      return action.fixtures;
    case GET_GAME_BY_ID:
      return action.fixtures;
    default:
      return state;
  }
}
