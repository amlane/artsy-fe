import React, { useState } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../store/actions';

function Register(props) {
    const [newUser, setNewUser] = useState({
        email: '',
        password: ''
    })


    const inputHandler = e => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const submitForm = e => {
        e.preventDefault();
        props.registerUser(newUser)
        setNewUser({
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
                value={newUser.email}
                onChange={inputHandler}
            />
            <label>Password</label>
            <input
                type="password"
                name="password"
                value={newUser.password}
                onChange={inputHandler}
            />
            <button type="submit">Sign up</button>
        </form>
    );
}


export default connect(null, { registerUser })(Register);
