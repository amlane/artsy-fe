import React from "react";
import { NavLink } from "react-router-dom";
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
      <NavLink to="/search/a">
        <FaSearch />
      </NavLink>
      <NavLink to="/user/posts">
        <FaUserAlt />
      </NavLink>
    </nav>
  );
}

export default MobileNav;
