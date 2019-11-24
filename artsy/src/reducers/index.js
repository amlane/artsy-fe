import { FETCH_USER, VISIT_USER, REMOVE_USER } from "../actions";

const initialState = {
  user: {
    id: "",
    photos: [],
    favorites: []
  },
  friend: {
    photos: [],
    favorites: []
  }
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
        friend: action.payload
      };
    case REMOVE_USER:
      return {
        ...state,
        user: {
          id: "",
          photos: [],
          favorites: []
        }
      };
    default:
      return state;
  }
}

export default reducer;
