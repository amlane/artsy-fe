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
            return dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        }
        )
        .catch(error => console.log(error.message));
}

export const loginUser = user => dispatch => {
    dispatch({ type: LOGIN_USER })
    axios
        .post("https://artsy-be.herokuapp.com/api/auth/login", user)
        .then(response => {
            window.localStorage.setItem('token', response.data.token);
            return dispatch({ type: 'LOGIN_SUCCESS', payload: user })
        }
        )
        .catch(error => console.log(error.message));
}