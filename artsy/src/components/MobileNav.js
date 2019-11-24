import React from "react";
import { NavLink } from "react-router-dom";
import decodedToken from "./utils/decodedToken";
import {
  FaPaintBrush,
  FaSearch,
  FaUserAlt,
  FaPalette,
  FaUsers
} from "react-icons/fa";

function MobileNav() {
  return (
    <nav className="mobile-nav">
      <NavLink to="/">
        <FaPalette />
      </NavLink>
      <NavLink to="/">
        <FaUsers />
      </NavLink>
      <NavLink to="/new-post">
        <FaPaintBrush />
      </NavLink>
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
