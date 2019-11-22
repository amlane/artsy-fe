import React from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../index.css";

function Navigation(props) {
  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  return (
    <nav className="desktop-nav">
      <Link to="/" className="title">
        Artsy
      </Link>
      <div style={{ display: "flex", width: "25%", justifyContent: "center" }}>
        <NavLink
          style={{ fontSize: "30px", color: "gray", padding: "0 15px" }}
          to="/"
        >
          <i className="fas fa-palette"></i>
        </NavLink>
        <NavLink
          style={{ fontSize: "30px", color: "gray", padding: "0 15px" }}
          to="/"
        >
          <i className="fas fa-users"></i>
        </NavLink>
        <NavLink
          style={{ fontSize: "30px", color: "gray", padding: "0 15px" }}
          to="/user/posts"
        >
          <i className="fas fa-user"></i>
        </NavLink>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            fontSize: "12px"
          }}
        >
          {localStorage.getItem("token") ? (
            <Nav.Link style={{ color: "silver" }} onClick={logout}>
              Log out
            </Nav.Link>
          ) : (
            <Nav.Link style={{ color: "silver" }} href="/login">
              Login/SignUp
            </Nav.Link>
          )}
        </div>
      </div>
      <form className="nav-search">
        <button type="search">
          <i className="fas fa-search"></i>
        </button>
        <input type="text" placeholder="Search" className="search-input" />
      </form>
    </nav>
  );
}

export default withRouter(Navigation);
