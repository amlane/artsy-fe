import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../actions";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import ExploreUsersCard from "./ExploreUsersCard";
import decodedToken from "../utils/decodedToken";
import Loader from "react-loader-spinner";

function ExploreUsers() {
  const followList = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [users, setUsers] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    dispatch(getUser());
    axios
      .get("https://artsy-be.herokuapp.com/api/users")
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
      .post(`https://artsy-be.herokuapp.com/api/follow/${id}`)
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
      .delete(`https://artsy-be.herokuapp.com/api/follow/${id}`)
      .then(res => {
        dispatch(getUser());
      })
      .catch(err => {
        console.log({ err });
      });
  };

  const getFollowerIds = followers.map(follower => follower.id);
  const getFollowingIds = following.map(following => following.id);

  if (!users)
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
          })
          .slice(0, 24)}
      </div>
    </div>
  );
}

export default ExploreUsers;
