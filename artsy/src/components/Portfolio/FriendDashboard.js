import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitUser } from "../../actions";
import { withRouter } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { Button, Jumbotron } from "react-bootstrap";
import Loader from "react-loader-spinner";
import moment from "moment";

import "../../index.css";

function FriendDashboard(props) {
  const friend = useSelector(state => state.friend);
  const dispatch = useDispatch();

  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    dispatch(visitUser(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  useEffect(() => {
    console.log("Follows");

    const list = friend.followers.map(follows => {
      return follows.id;
    });
    if (list.includes(decodedToken())) {
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }, [friend]);

  const followArtist = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(
        `https://artsy-be.herokuapp.com/api/follow/${props.match.params.id}`
      )
      .then(res => {
        console.log(res);
        dispatch(visitUser(props.match.params.id));
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const unfollowArtist = e => {
    e.preventDefault();
    axiosWithAuth()
      .delete(
        `https://artsy-be.herokuapp.com/api/follow/${props.match.params.id}`
      )
      .then(res => {
        console.log(res);
        dispatch(visitUser(props.match.params.id));
      })
      .catch(err => {
        console.log({ err });
      });
  };

  if (!friend || friend.id !== +props.match.params.id)
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

  const followersId = friend.followers.map(follows => {
    return follows.id;
  });

  console.log(followersId.includes(decodedToken()));

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
            +props.match.params.id === decodedToken() ? (
              <Button
                className="mobile"
                variant="outline-secondary"
                href="/edit-profile"
              >
                Edit Profile
              </Button>
            ) : isFollowing ? (
              <Button
                className="mobile"
                variant="outline-info"
                onClick={unfollowArtist}
              >
                Unfollow
              </Button>
            ) : (
              <Button className="mobile" variant="info" onClick={followArtist}>
                Follow
              </Button>
            )
          ) : null}
        </header>
        <section>
          <div>
            <h1>{friend.username}</h1>
            {localStorage.getItem("token") ? (
              +props.match.params.id === decodedToken() ? (
                <Button
                  className="desktop"
                  variant="outline-secondary"
                  href="/edit-profile"
                >
                  Edit Profile
                </Button>
              ) : isFollowing ? (
                <Button
                  className="desktop"
                  variant="outline-info"
                  onClick={unfollowArtist}
                >
                  Unfollow
                </Button>
              ) : (
                <Button
                  className="desktop"
                  variant="info"
                  onClick={followArtist}
                >
                  Follow
                </Button>
              )
            ) : null}
          </div>
          <p>{friend.about}</p>
          <div className="main">
            <div className="follows">
              <p>
                <i className="fas fa-user"></i>
                {friend.following.length} following
              </p>
              <p>
                <i className="fas fa-users"></i>
                {friend.followers.length} followers
              </p>
            </div>
            <div className="info">
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
