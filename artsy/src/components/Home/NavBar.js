import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "../../index.css";
import decodedToken from "./../utils/decodedToken";
import { Dropdown } from "react-bootstrap";
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
          <WiStars style={{ fontSize: "45px" }} />
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
          <IoIosPeople style={{ fontSize: "45px" }} />
          <p>Connect</p>
        </NavLink>
        <div
          style={{
            color: "gray",
            padding: "0 15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
          // to={`/user/${decodedToken()}/posts`}
        >
          {decodedToken() !== undefined ? (
            <>
              <NavLink to={`/portfolio/${decodedToken()}/posts`}>
                <MdHome style={{ fontSize: "35px", color: "gray" }} />
              </NavLink>
              <Dropdown>
                <Dropdown.Toggle
                  id="dropdown-desktop"
                  style={{
                    background: "none",
                    color: "gray",
                    paddingTop: "0",
                    marginTop: "1px",
                    border: "none"
                  }}
                  variant="outline-light"
                >
                  You
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href={`/portfolio/${decodedToken()}/posts`}>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item href={`/settings/${decodedToken()}`}>
                    Settings
                  </Dropdown.Item>
                  <Dropdown.Item onClick={signOut}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : (
            <>
              <NavLink to={`/login`}>
                <MdHome
                  style={{
                    fontSize: "45px",
                    color: "gray"
                  }}
                />
                <p style={{ textAlign: "center", color: "gray" }}>You</p>
              </NavLink>
            </>
          )}
        </div>
        <div
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            fontSize: "12px"
          }}
        >
          {localStorage.getItem("token") ? null : (
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
