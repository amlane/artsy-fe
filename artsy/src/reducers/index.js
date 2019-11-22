import { FETCH_USER, VISIT_USER } from "../actions";

const initialState = {
  user: {
    photos: [],
    favorites: []
  },
  friend: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload
      };
    case VISIT_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
