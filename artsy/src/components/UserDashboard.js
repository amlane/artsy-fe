import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, visitUser } from "../actions";
import { NavLink, withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";

import { Button, Jumbotron } from "react-bootstrap";
import Loader from "react-loader-spinner";
import "../index.css";

import moment from "moment";

function UserDashboard(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  var token = localStorage.getItem("token");
  var decoded = jwt_decode(token);

  useEffect(() => {
    console.log("checkin for loops");
    if (props.match.params.id === decoded.subject) {
      dispatch(getUser());
    } else {
      dispatch(visitUser());
    }
  }, [dispatch, props.match.params.id]);

  if (!user)
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

  console.log(user);
  return (
    <>
      <Jumbotron className="user-dashboard">
        <header>
          <img className="avatar" src={user.avatar_url} alt={user.username} />
          {props.match.params.id == decoded.subject ? (
            <Button
              className="mobile"
              variant="outline-secondary"
              href="/edit-profile"
            >
              Edit Profile
            </Button>
          ) : null}
        </header>
        <section>
          <div>
            <h1>{user.username}</h1>
            {props.match.params.id == decoded.subject ? (
              <Button
                className="desktop"
                variant="outline-secondary"
                href="/edit-profile"
              >
                Edit Profile
              </Button>
            ) : null}
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
          {props.match.params.id == decoded.subject ? (
            <Button variant="info" href="/new-post" className="desktop-add-btn">
              Add Post
            </Button>
          ) : null}
        </section>
      </Jumbotron>
      <nav className="dashboard-nav">
        <NavLink to={`/user/${user.id}/posts`}>Posts</NavLink>
        <NavLink to={`/user/${user.id}/favorites`}>Favorites</NavLink>
      </nav>
    </>
  );
}

export default withRouter(UserDashboard);
