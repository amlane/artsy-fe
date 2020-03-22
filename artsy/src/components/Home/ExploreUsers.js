import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../actions";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import ExploreUsersCard from "./ExploreUsersCard";
import decodedToken from "../utils/decodedToken";
import ThreeDotLoader from "../utils/ThreeDotLoader";

function ExploreUsers() {
  const followList = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [users, setUsers] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    dispatch(getUser());
    axios
      .get(`${baseURL}/users`)
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [dispatch]);

  useEffect(() => {
    if (followList) {
      setFollowers(followList.followers);
      setFollowing(followList.following);
    }
  }, [followList]);

  const followArtist = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`${baseURL}/follow/${id}`)
      .then(res => {
        dispatch(getUser());
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const unfollowArtist = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`${baseURL}/follow/${id}`)
      .then(res => {
        dispatch(getUser());
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const getFollowerIds = followers.map(follower => follower.id);
  const getFollowingIds = following.map(following => following.id);

  if (!users) return <ThreeDotLoader />;
  return (
    <div
      style={{
        maxWidth: "1000px",
        display: "flex",
        flexDirection: "column",
        margin: "25px auto"
      }}
    >
      <h2 style={{ textAlign: "center" }}>New Artists</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "0 auto"
        }}
      >
        {users
          .filter(user => user.id !== decodedToken())
          .map(user => {
            return (
              <ExploreUsersCard
                user={user}
                key={user.id}
                getFollowerIds={getFollowerIds}
                getFollowingIds={getFollowingIds}
                followArtist={followArtist}
                unfollowArtist={unfollowArtist}
              />
            );
          })
          .reverse()
          .slice(0, 6)}
      </div>
      <h2 style={{ textAlign: "center" }}>Popular Artists</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          margin: "0 auto"
        }}
      >
        {users
          .filter(user => user.id !== decodedToken())
          .map(user => {
            return (
              <ExploreUsersCard
                user={user}
                key={user.id}
                getFollowerIds={getFollowerIds}
                getFollowingIds={getFollowingIds}
                followArtist={followArtist}
                unfollowArtist={unfollowArtist}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ExploreUsers;
