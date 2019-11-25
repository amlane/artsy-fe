import React from "react";
import { NavLink } from "react-router-dom";
import decodedToken from "./../utils/decodedToken";
import {
  FaPaintBrush,
  FaSearch,
  FaUserAlt,
  FaPalette,
  FaUsers,
  FaPlus
} from "react-icons/fa";
import { Button } from "react-bootstrap";

function MobileNav() {
  return (
    <nav className="mobile-nav">
      <NavLink to="/">
        <FaPalette />
      </NavLink>
      <NavLink to="/">
        <FaUsers />
      </NavLink>
      {/* <NavLink to="/new-post">
        <FaPaintBrush />
      </NavLink> */}
      <Button
        variant="info"
        href="/new-post"
        className="mobile-add-btn"
        style={{
          position: "relative",
          bottom: "15px"
        }}
      >
        <FaPlus size="1.5em" style={{ color: "#FFF" }} />
      </Button>
      <NavLink to="/search/art">
        <FaSearch />
      </NavLink>
      <NavLink to={`/user/${decodedToken()}/posts`}>
        <FaUserAlt />
      </NavLink>
    </nav>
  );
}

export default MobileNav;
