import React from "react";
import axios from "axios";

class Login extends React.Component {
    state = {
        email: "amanda@email.com",
        password: "1234"
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        axios.post("https://artsy-be.herokuapp.com/api/auth/login", this.state)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                this.props.history.push("/user")
            })
            .catch(err => {
                console.log({ err })
            })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>username</label>
                <input
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.email}
                    name="email"
                />
                <label>password</label>
                <input
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    name="password"
                />
                <button>login</button>
            </form>
        )
    }
}

export default Login;