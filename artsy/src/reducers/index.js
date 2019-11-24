import {
  FETCH_USER,
  VISIT_USER,
  REMOVE_USER,
  SET_USER_FAVORITES,
  SET_FAVS_ID
} from "../actions";

const initialState = {
  user: {
    id: "",
    photos: [],
    favorites: []
  },
  userFavorites: [],
  favsID: [],
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
    case SET_USER_FAVORITES:
      return {
        ...state,
        userFavorites: action.payload
      };
    case SET_FAVS_ID:
      return {
        ...state,
        favsID: state.userFavorites.map(favs => {
          return favs.id;
        })
      };
    default:
      return state;
  }
}

export default reducer;
