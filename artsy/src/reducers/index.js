import { FETCH_USER } from "../actions";

const initialState = {
  user: {
    photos: [],
    favorites: []
  },
  userLoggedIn: null
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}

export default reducer;
