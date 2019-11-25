import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../../index.css";
import decodedToken from "./../utils/decodedToken";

function Navigation(props) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const searchRoute = e => {
    e.preventDefault();
    if (inputValue === "") {
      props.history.push(`/search/""`);
    } else {
      props.history.push(`/search/${inputValue}`);
    }
  };

  const signOut = () => {
    dispatch(logout());
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
          to={`/user/${decodedToken()}/posts`}
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
            <Nav.Link style={{ color: "silver" }} onClick={signOut}>
              Log out
            </Nav.Link>
          ) : (
            <Nav.Link style={{ color: "silver" }} href="/login">
              Login/SignUp
            </Nav.Link>
          )}
        </div>
      </div>
      <form onSubmit={searchRoute} className="nav-search">
        <button type="search">
          <i className="fas fa-search"></i>
        </button>
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          value={inputValue}
          onChange={handleChange}
        />
      </form>
    </nav>
  );
}

export default withRouter(Navigation);