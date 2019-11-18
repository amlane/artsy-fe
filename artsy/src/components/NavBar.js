import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../index.css"

function Navigation(props) {

    const logout = () => {
        localStorage.removeItem("token");
        props.history.push("/")
    }

    return (
        <nav variant="light" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: "#fff", borderBottom: '1px solid silver' }}>
            <Link to="/" style={{ fontFamily: 'Megrim, cursive', fontSize: '64px', margin: '0 3% 0 3%' }}>Artsy</Link>
            <form style={{}}>
                <input type="text" placeholder="Search" className="search-input" />
                <button><i className="fas fa-search"></i></button>
            </form>
            <div style={{ display: 'flex', width: '25%', justifyContent: 'center' }}>
                <NavLink style={{ fontSize: "30px", color: "gray", padding: '0 15px' }} to="/"><i className="fas fa-palette"></i></NavLink>
                <NavLink style={{ fontSize: "30px", color: "gray", padding: '0 15px' }} to="/"><i className="fas fa-users"></i></NavLink>
                <NavLink style={{ fontSize: "30px", color: "gray", padding: '0 15px' }} to="/user/posts"><i className="fas fa-user"></i></NavLink>
                <div style={{ position: 'absolute', top: '0', right: '0', fontSize: '12px' }}>
                    {localStorage.getItem("token") ? (
                        <Nav.Link style={{ color: 'silver' }} onClick={logout}>Log out</Nav.Link>
                    ) : (
                            <Nav.Link style={{ color: 'silver' }} href="/login">Login/SignUp</Nav.Link>
                        )}
                </div>
            </div>
        </nav >
    )
}

export default withRouter(Navigation);