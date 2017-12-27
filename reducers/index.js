import { ADD_DECK, GET_DECKS } from "../actions";

function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, ...action.deck };
    case GET_DECKS:
      return { ...state, ...action.decks };
    default:
      return state;
  }
}

export default decks;
