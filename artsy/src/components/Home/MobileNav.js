import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import { WiStars } from "react-icons/wi";
import { IoIosPeople, IoIosSearch, IoIosAdd } from "react-icons/io";
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
        variant="info"
        href="/new-post"
        className="mobile-add-btn"
        style={{
          position: "relative",
          bottom: "15px"
        }}
      >
        <MdAdd style={{ color: "#FFF" }} />
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
