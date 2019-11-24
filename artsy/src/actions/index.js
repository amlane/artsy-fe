import axios from "axios";
import decodedToken from "../components/utils/decodedToken";

export const FETCH_USER = "FETCH_USER";
export const VISIT_USER = "VISIT_USER";
export const REMOVE_USER = "REMOVE_USER";

export const getUser = () => dispatch => {
  if (decodedToken() !== undefined) {
    axios
      .get(`https://artsy-be.herokuapp.com/api/users/${decodedToken()}`)
      .then(res => {
        dispatch({ type: FETCH_USER, payload: res.data.user });
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
