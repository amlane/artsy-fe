import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../actions";
import { NavLink, withRouter } from "react-router-dom";
import decodedToken from "../utils/decodedToken";

import { Button, Jumbotron } from "react-bootstrap";
import { FaRegCalendarAlt, FaRegStar } from "react-icons/fa";
import { MdAdd, MdLocationOn } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import Loader from "react-loader-spinner";
import "../../index.css";

import moment from "moment";

function UserDashboard(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (+props.match.params.id === decodedToken()) {
      dispatch(getUser());
    } else {
      props.history.push("/login");
    }
  }, [dispatch, props.match.params.id, props.history]);

  if (!user.username || user.photos.length === 0)
    return (
      <Loader
        type="ThreeDots"
        color="#1C93B9"
        height={150}
        width={150}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15vh"
        }}
      />
    );

  return (
    <>
      <Jumbotron className="user-dashboard">
        <header>
          <img className="avatar" src={user.avatar_url} alt={user.username} />
          <Button
            className="mobile"
            variant="outline-secondary"
            href="/edit-profile"
          >
            Edit Profile
          </Button>
        </header>
        <section>
          <div>
            <h1>{user.username}</h1>

            <Button
              className="desktop edit"
              variant="outline-secondary"
              href="/edit-profile"
            >
              Edit Profile
            </Button>
          </div>
          <p>{user.about}</p>
          <div className="main">
            <div className="info">
              {user.location ? (
                <p>
                  <MdLocationOn size="1.25em" style={{ marginRight: "5px" }} />
                  {user.location}
                </p>
              ) : null}
              <p>
                <FiCamera size="1.25em" style={{ marginRight: "5px" }} />
                {user.photos && user.photos.length}{" "}
                {user.photos.length === 1 ? "post" : "posts"}
              </p>
            </div>
            <p>
              <FaRegCalendarAlt size="1.25em" style={{ marginRight: "5px" }} />
              Joined {moment(user.created_at).fromNow()}
            </p>
            <div className="follows">
              <p>
                <span>{user.following && user.following.length}</span> following
              </p>
              <p>
                <span>{user.followers && user.followers.length}</span> followers
              </p>
            </div>
          </div>

          <Button variant="info" href="/new-post" className="desktop-add-btn">
            <MdAdd size="1.5em" />
          </Button>
          {/* <Button variant="info" href="/new-post" className="mobile-add-btn">
            <FaPlus size="1.5em" style={{ display: "block" }} />
          </Button> */}
        </section>
      </Jumbotron>
      <nav className="dashboard-nav">
        <NavLink to={`/user/${user.id}/posts`}>
          <FiCamera size="2em" />
        </NavLink>
        <NavLink to={`/user/${user.id}/favorites`}>
          <FaRegStar size="2em" />
        </NavLink>
      </nav>
    </>
  );
}

export default withRouter(UserDashboard);
