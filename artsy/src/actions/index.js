import axios from "axios";
import decodedToken from "../components/utils/decodedToken";

export const FETCH_USER = "FETCH_USER";
export const VISIT_USER = "VISIT_USER";
export const REMOVE_USER = "REMOVE_USER";
export const SET_USER_FAVORITES = "SET_USER_FAVORITES";
export const SET_FAVS_ID = "SET_FAVS_ID";

export const getUser = () => dispatch => {
  if (decodedToken() !== undefined) {
    axios
      .get(`https://artsy-be.herokuapp.com/api/users/${decodedToken()}`)
      .then(res => {
        dispatch({ type: FETCH_USER, payload: res.data.user });
        dispatch({
          type: SET_USER_FAVORITES,
          payload: res.data.user.favorites
        });
      })
      .catch(err => {
        console.log({ err });
      });
  } else {
    dispatch({ type: REMOVE_USER });
  }
};

export const visitUser = userId => dispatch => {
  if (userId !== undefined) {
    axios
      .get(`https://artsy-be.herokuapp.com/api/users/${userId}`)
      .then(res => {
        dispatch({ type: VISIT_USER, payload: res.data.user });
      })
      .catch(err => {
        console.log({ err });
      });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({ type: REMOVE_USER });
};

export const setUserFavorites = () => dispatch => {
  if (decodedToken() !== undefined) {
    axios
      .get(`https://artsy-be.herokuapp.com/api/users/${decodedToken()}`)
      .then(res => {
        dispatch({
          type: SET_USER_FAVORITES,
          payload: res.data.user.favorites
        });
      })
      .catch(err => {
        console.log({ err });
      });
  }
};

export const setFavsID = () => dispatch => {
  dispatch({ type: SET_FAVS_ID });
};
