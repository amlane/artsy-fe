import axios from 'axios';

export const REGISTER_USER = "REGISTER_USER";
export const LOGIN_USER = "LOGIN_USER";

export const registerUser = user => dispatch => {
    dispatch({ type: REGISTER_USER })
    axios
        .post("https://artsy-be.herokuapp.com/api/auth/register", user)
        .then(response => {
            console.log(response)
            window.localStorage.setItem('token', response.data.token);
            return dispatch({ type: REGISTER_USER, payload: response.data.user })
        }
        )
        .catch(error => console.log(error.message));
}

export const loginUser = user => dispatch => {
    console.log('user', user)
    return dispatch({ type: LOGIN_USER, payload: user })
}

export const GET_USER_INFO = "GET_USER_INFO"

export const getUserInfo = id => dispatch => {
    console.log(id, 'id')
    dispatch({ type: GET_USER_INFO })
    axios
        .get(`https://artsy-be.herokuapp.com/api/users/${id}`)
        .then(response => {
            return dispatch({ type: GET_USER_INFO, payload: response.data.user })
        }).catch(error => console.log(error.message))
}