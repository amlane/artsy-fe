import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../index.css"

function NavBar(props) {

    const logout = () => {
        localStorage.removeItem("token");
        props.history.push("/")
    }

    return (
        <nav>
            <h1>Artsy</h1>
            <Link to="/">Login/SignUp</Link>
            <p onClick={logout}>Log out</p>
        </nav>
    )
}

export default withRouter(NavBar);