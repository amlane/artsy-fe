import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios'

import { loginUser } from '../store/actions';

function SignIn(props) {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })


    const inputHandler = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const submitForm = e => {
        e.preventDefault();
        axios
            .post("https://artsy-be.herokuapp.com/api/auth/login", user)
            .then(response => {
                window.localStorage.setItem('token', response.data.token);
                props.loginUser(response.data.user)

            }
            ).then(() => props.history.push('/dashboard'))
            .catch(error => console.log(error.message));

        setUser({
            email: '',
            password: ''
        })
    }


    return (
        <form onSubmit={submitForm}>
            <label>Email</label>
            <input
                type="email"
                name="email"
                value={user.email}
                onChange={inputHandler}
            />
            <label>Password</label>
            <input
                type="password"
                name="password"
                value={user.password}
                onChange={inputHandler}
            />
            <button type="submit">Sign in</button>
        </form>
    );
}


export default connect(null, { loginUser })(SignIn);