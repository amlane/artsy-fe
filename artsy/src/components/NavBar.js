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
            <Link to="/">Artsy</Link>
            <Link to="/user">Dashboard</Link>
            {localStorage.getItem("token") ? (
                <p onClick={logout}>Log out</p>
            ) : (
                    <Link to="/">Login/SignUp</Link>
                )}
        </nav>
    )
}

export default withRouter(NavBar);