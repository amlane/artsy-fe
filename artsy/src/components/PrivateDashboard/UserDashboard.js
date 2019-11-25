import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../actions";
import { NavLink, withRouter } from "react-router-dom";
import decodedToken from "../utils/decodedToken";

import { Button, Jumbotron } from "react-bootstrap";
import { MdAdd } from "react-icons/md";
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
            <div className="follows">
              <p>
                <i className="fas fa-user"></i>
                {user.following && user.following.length} following
              </p>
              <p>
                <i className="fas fa-users"></i>
                {user.followers && user.followers.length} followers
              </p>
            </div>
            <div className="info">
              <p>
                <i className="fas fa-palette"></i>
                {user.photos && user.photos.length} posts
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
        <NavLink to={`/user/${user.id}/posts`}>Posts</NavLink>
        <NavLink to={`/user/${user.id}/favorites`}>Favorites</NavLink>
      </nav>
    </>
  );
}

export default withRouter(UserDashboard);
