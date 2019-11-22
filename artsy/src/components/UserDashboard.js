import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../actions";
import { NavLink } from "react-router-dom";

import { Button, Jumbotron } from "react-bootstrap";
import Loader from "react-loader-spinner";
import "../index.css";

import moment from "moment";

function UserDashboard() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (!user.username)
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
              className="desktop"
              variant="outline-secondary"
              href="/edit-profile"
            >
              Edit Profile
            </Button>
          </div>
          <p>{user.about}</p>
          <div className="main">
            <p>
              <i className="fas fa-palette"></i>
              {user.photos.length} posts
            </p>
            <p>
              <i className="fas fa-paint-brush"></i>Joined{" "}
              {moment(user.created_at).fromNow()}
            </p>
            {user.location ? (
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {user.location}
              </p>
            ) : null}
          </div>
          <Button variant="info" href="/new-post" className="desktop-add-btn">
            Add Post
          </Button>
        </section>
      </Jumbotron>
      <nav className="dashboard-nav">
        <NavLink to="/user/posts">Posts</NavLink>
        <NavLink to="/user/favorites">Favorites</NavLink>
      </nav>
    </>
  );
}

export default UserDashboard;
