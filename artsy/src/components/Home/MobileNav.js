import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import { WiStars } from "react-icons/wi";
import { IoIosPeople, IoIosSearch } from "react-icons/io";
import { MdHome, MdAdd } from "react-icons/md";
import { Button } from "react-bootstrap";

function MobileNav() {
  return (
    <nav className="mobile-nav">
      <NavLink to="/">
        <WiStars size="1.5em" />
      </NavLink>
      <NavLink to="/">
        <IoIosPeople size="1.25em" />
      </NavLink>
      <Button
        variant="outline-secondary"
        href="/new-post"
        className="mobile-add-btn"
      >
        <MdAdd />
      </Button>
      <NavLink to="/search/art">
        <IoIosSearch size="1.25em" />
      </NavLink>
      <NavLink to={`/user/${decodedToken()}/posts`}>
        <MdHome size="1.25em" />
      </NavLink>
    </nav>
  );
}

export default withRouter(MobileNav);
