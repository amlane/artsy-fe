import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../../index.css";
import decodedToken from "./../utils/decodedToken";
import { WiStars } from "react-icons/wi";
import { IoIosPeople, IoIosSearch } from "react-icons/io";
import { MdHome } from "react-icons/md";

function Navigation(props) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");

  const handleChange = e => {
    setInputValue(e.target.value);
  };

  const submitSearch = e => {
    e.preventDefault();
    if (inputValue === "") {
      props.history.push(`/search/""`);
    } else {
      props.history.push(`/search/${inputValue}`);
      setInputValue("");
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

      <form onSubmit={submitSearch} className="nav-search">
        <input
          type="text"
          placeholder="Search for titles"
          className="search-input"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="search">
          <IoIosSearch size="1.5em" style={{ color: "gray" }} />
        </button>
      </form>

      <div
        className="icons"
        style={{ display: "flex", width: "25%", justifyContent: "center" }}
      >
        <NavLink
          style={{
            color: "gray",
            padding: "0 15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid #ece9e7"
          }}
          to="/"
        >
          <WiStars style={{ fontSize: "35px" }} />
          <p>Explore</p>
        </NavLink>
        <NavLink
          style={{
            color: "gray",
            padding: "0 15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRight: "1px solid #ece9e7"
          }}
          to="/connect"
        >
          <IoIosPeople style={{ fontSize: "35px" }} />
          <p>Connect</p>
        </NavLink>
        <NavLink
          style={{
            color: "gray",
            padding: "0 15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          to={`/user/${decodedToken()}/posts`}
        >
          <MdHome style={{ fontSize: "35px" }} />
          <p>You</p>
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
            <Nav.Link style={{ color: "gray" }} onClick={signOut}>
              Log out
            </Nav.Link>
          ) : (
            <Nav.Link style={{ color: "gray" }} href="/login">
              Login/SignUp
            </Nav.Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default withRouter(Navigation);
