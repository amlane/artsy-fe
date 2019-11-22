import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../actions";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../index.css";
import jwt_decode from "jwt-decode";

function Navigation(props) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  var token = localStorage.getItem("token");

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const searchRoute = e => {
    props.history.push(`/search/${inputValue}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  const getMyProfile = () => {
    if (token) {
      var decoded = jwt_decode(token);
      dispatch(getUser());
      props.history.push(`/user/${decoded.subject}/posts`);
    }
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
        <div
          style={{ fontSize: "30px", color: "gray", padding: "0 15px" }}
          onClick={getMyProfile}
        >
          <i className="fas fa-user"></i>
        </div>
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
