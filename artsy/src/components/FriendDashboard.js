import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitUser } from "../actions";
import { withRouter } from "react-router-dom";
import decodedToken from "./utils/decodedToken";

import { Button, Jumbotron } from "react-bootstrap";
import Loader from "react-loader-spinner";
import moment from "moment";

import "../index.css";

function FriendDashboard(props) {
  const friend = useSelector(state => state.friend);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(visitUser(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  if (!friend)
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
          <img
            className="avatar"
            src={friend.avatar_url}
            alt={friend.username}
          />
          {localStorage.getItem("token") ? (
            props.match.params.id.toString() === decodedToken().toString() ? (
              <Button
                className="mobile"
                variant="outline-secondary"
                href="/edit-profile"
              >
                Edit Profile
              </Button>
            ) : (
              <Button className="mobile" variant="outline-secondary" href="/">
                Follow
              </Button>
            )
          ) : null}
        </header>
        <section>
          <div>
            <h1>{friend.username}</h1>
            {localStorage.getItem("token") ? (
              props.match.params.id.toString() === decodedToken().toString() ? (
                <Button
                  className="desktop"
                  variant="outline-secondary"
                  href="/edit-profile"
                >
                  Edit Profile
                </Button>
              ) : (
                <Button
                  className="desktop"
                  variant="outline-secondary"
                  href="/"
                >
                  Follow
                </Button>
              )
            ) : null}
          </div>
          <p>{friend.about}</p>
          <div className="main">
            <p>
              <i className="fas fa-palette"></i>
              {friend.photos.length} posts
            </p>
            <p>
              <i className="fas fa-paint-brush"></i>Joined{" "}
              {moment(friend.created_at).fromNow()}
            </p>
            {friend.location ? (
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {friend.location}
              </p>
            ) : null}
          </div>
          {/* {localStorage.getItem("token") && props.match.params.id.toString() === decodedToken().toString() ? (
            <Button variant="info" href="/new-post" className="desktop-add-btn">
              Add Post
            </Button>
          ) : null} */}
        </section>
      </Jumbotron>
      <nav className="dashboard-nav">
        {/* <NavLink to={`/portfolio/${friend.id}`}>Posts</NavLink> */}
        {/* <NavLink to={`/user/${friend.id}/favorites`}>Favorites</NavLink> */}
      </nav>
    </>
  );
}

export default withRouter(FriendDashboard);
