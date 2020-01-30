import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../../actions";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import decodedToken from "../utils/decodedToken";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function MyFollowers({ followers, following }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const followingIDs = following.map(follow => follow.id);

  const followArtist = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`https://artsy-be.herokuapp.com/api/follow/${id}`)
      .then(res => {
        console.log(res);
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
        console.log(res);
        dispatch(getUser());
      })
      .catch(err => {
        console.log({ err });
      });
  };
  return (
    <>
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        <span>{followers && followers.length}</span> followers
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px" }}>Followers</Modal.Title>
        </Modal.Header>
        <Modal.Body
          scrollable="true"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          {followers.map(follower => {
            return (
              <div
                key={follower.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Link
                  to={`/portfolio/${follower.id}/posts`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#333"
                  }}
                >
                  <img
                    src={follower.avatar_url}
                    alt={follower.username}
                    style={{
                      height: "45px",
                      width: "45px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "50%",
                      margin: "10px"
                    }}
                  />
                  <span>{follower.username}</span>
                </Link>
                {localStorage.getItem("token") &&
                follower.id !== decodedToken() ? (
                  followingIDs.includes(follower.id) ? (
                    <button
                      className="unfollow-btn"
                      onClick={e => unfollowArtist(e, follower.id)}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="follow-btn"
                      onClick={e => followArtist(e, follower.id)}
                    >
                      <IoMdPersonAdd style={{ marginRight: "5px" }} /> Follow
                    </button>
                  )
                ) : null}
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyFollowers;
