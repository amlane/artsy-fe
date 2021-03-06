import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitUser, getUser, logout } from "../../actions";
import { withRouter, NavLink } from "react-router-dom";
import decodedToken from "../utils/decodedToken";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Button, Jumbotron, Dropdown } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";
import { FaRegCalendarAlt, FaRegStar } from "react-icons/fa";
import { MdLocationOn, MdAdd } from "react-icons/md";
import { FiCamera } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import ThreeDotLoader from "../utils/ThreeDotLoader";
import moment from "moment";

import "../../styles/app.scss";
import Followers from "./Followers";
import Following from "./Following";

function Dashboard(props) {
  const friend = useSelector(state => state.friend);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [isFollowing, setIsFollowing] = useState(null);

  useEffect(() => {
    dispatch(visitUser(props.match.params.id));
    dispatch(getUser());
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
      .post(`${baseURL}/follow/${props.match.params.id}`)
      .then(res => {
        dispatch(visitUser(props.match.params.id));
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const unfollowArtist = e => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`${baseURL}/follow/${props.match.params.id}`)
      .then(res => {
        dispatch(visitUser(props.match.params.id));
      })
      .catch(err => {
        console.log({ err });
      });
  };

  if (!friend || friend.id !== +props.match.params.id)
    return <ThreeDotLoader />;

  const signOut = () => {
    dispatch(logout());
    props.history.push("/");
  };

  return (
    <>
      {localStorage.getItem("token") &&
      +props.match.params.id === decodedToken() ? (
        <Dropdown alignRight className="settings-dropdown">
          <Dropdown.Toggle
            style={{
              background: "none",
              color: "gray",
              border: "1px solid #FFF"
            }}
            variant="light"
            id="dropdown-basic"
          >
            <GoGear size="1.5em" />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href={`/settings/${decodedToken()}`}>
              Settings
            </Dropdown.Item>
            <Dropdown.Item onClick={signOut}>Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : null}
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
              <Button className="mobile" onClick={unfollowArtist}>
                Unfollow
              </Button>
            ) : (
              <Button className="mobile follow" onClick={followArtist}>
                <IoMdPersonAdd style={{ marginRight: "5px" }} /> Follow
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
                <Button className="desktop follow" onClick={followArtist}>
                  <IoMdPersonAdd style={{ marginRight: "10px" }} /> Follow
                </Button>
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
              <Following following={friend.following} />
              <Followers
                followers={friend.followers}
                following={user.following}
              />
            </div>
          </div>
          {localStorage.getItem("token") &&
          +props.match.params.id === decodedToken() ? (
            <Button
              className="desktop-add-btn"
              variant="outline-secondary"
              href="/new-post"
            >
              <MdAdd size="28" />
            </Button>
          ) : null}
        </section>
      </Jumbotron>
      <nav className="dashboard-nav">
        <NavLink to={`/portfolio/${friend.id}/posts`}>
          <FiCamera size="1.5em" /> <p style={{ marginLeft: "5px" }}>Artwork</p>
        </NavLink>
        <NavLink to={`/portfolio/${friend.id}/favorites`}>
          <FaRegStar size="1.5em" />
          <p style={{ marginLeft: "5px" }}>Favorites</p>
        </NavLink>
        {/* <NavLink to={`/portfolio/${friend.id}/info`}>
          <GoInfo size="1.5em" />
          <p style={{ marginLeft: "5px" }}>Gallery Info</p>
        </NavLink> */}
      </nav>
    </>
  );
}

export default withRouter(Dashboard);
