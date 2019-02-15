import { APPLY_FOR_GAME, GET_APPLICATIONS } from "../actions/types";

const initialState = [];

export default function applicationReducer(state = initialState, action) {
  switch (action.type) {
    case APPLY_FOR_GAME:
      return action.payload;
    case GET_APPLICATIONS:
      return action.applications;
    default:
      return state;
  }
}
