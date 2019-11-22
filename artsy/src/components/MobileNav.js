import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../actions";
import { NavLink, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import {
  FaPaintBrush,
  FaSearch,
  FaUserAlt,
  FaPalette,
  FaUsers
} from "react-icons/fa";

function MobileNav(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const getMyProfile = () => {
    var token = localStorage.getItem("token");
    if (token) {
      var decoded = jwt_decode(token);
    }
    dispatch(getUser());
    props.history.push(`/user/${decoded.subject}/posts`);
  };
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
      <div onClick={getMyProfile}>
        <FaUserAlt />
      </div>
    </nav>
  );
}

export default withRouter(MobileNav);
