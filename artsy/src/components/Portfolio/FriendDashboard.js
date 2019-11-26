import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitUser } from "../../actions";
import { withRouter } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import { axiosWithAuth } from "../utils/axiosWithAuth";

import { Button, Jumbotron } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
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
              <button
                className="mobile"
                variant="outline-info"
                onClick={unfollowArtist}
              >
                Unfollow
              </button>
            ) : (
              <button
                className="mobile follow"
                variant="info"
                onClick={followArtist}
              >
                <IoMdPersonAdd style={{ marginRight: "5px" }} /> Follow
              </button>
            )
          ) : null}
        </header>
        <section>
          <div>
            <h1>{friend.username}</h1>
            {localStorage.getItem("token") ? (
              +props.match.params.id === decodedToken() ? (
                <button
                  className="desktop"
                  variant="outline-secondary"
                  href="/edit-profile"
                >
                  Edit Profile
                </button>
              ) : isFollowing ? (
                <button
                  className="desktop"
                  variant="outline-info"
                  onClick={unfollowArtist}
                >
                  Unfollow
                </button>
              ) : (
                <button className="desktop follow" onClick={followArtist}>
                  <IoMdPersonAdd style={{ marginRight: "10px" }} /> Follow
                </button>
              )
            ) : null}
          </div>
          <p>{friend.about}</p>
          <div className="main">
            <div className="info">
              {friend.location ? (
                <p>
                  <MdLocationOn size="1.25em" style={{ marginRight: "5px" }} />
                  {friend.location}
                </p>
              ) : null}
              <p>
                <FiCamera size="1.25em" style={{ marginRight: "5px" }} />
                {friend.photos && friend.photos.length}{" "}
                {friend.photos.length === 1 ? "post" : "posts"}
              </p>
            </div>
            <p>
              <FaRegCalendarAlt size="1.25em" style={{ marginRight: "5px" }} />
              Joined {moment(friend.created_at).fromNow()}
            </p>
            <div className="follows">
              <p>
                <span>{friend.following && friend.following.length}</span>{" "}
                following
              </p>
              <p>
                <span>{friend.followers && friend.followers.length}</span>{" "}
                {friend.followers.length === 1 ? "follower" : "followers"}
              </p>
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
