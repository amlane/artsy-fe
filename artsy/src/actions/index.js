import axios from "axios";
import jwt_decode from "jwt-decode";

export const FETCH_USER = "FETCH_USER";

export const getUser = () => dispatch => {
  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);

  axios
    .get(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`)
    .then(res => {
      dispatch({ type: FETCH_USER, payload: res.data.user });
    })
    .catch(err => {
      console.log({ err });
    });
};
