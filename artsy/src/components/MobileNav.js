import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  FaPaintBrush,
  FaSearch,
  FaUserAlt,
  FaPalette,
  FaUsers
} from "react-icons/fa";

function MobileNav() {
  const user = useSelector(state => state.user);
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
      <NavLink to={`/user/${user.id}/posts`}>
        <FaUserAlt />
      </NavLink>
    </nav>
  );
}

export default MobileNav;
