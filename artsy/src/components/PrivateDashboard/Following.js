import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../actions";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function Following({ following }) {
  const list = useSelector(state => state.user.following);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const followingIDs = list.map(follow => follow.id);

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
  console.log(following);
  return (
    <>
      <div
        onClick={handleShow}
        style={{ cursor: "pointer", marginRight: "1.5rem" }}
      >
        <span>{following && following.length}</span> following
      </div>

      <Modal show={show} onHide={handleClose} centered scrollable="true">
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: "16px" }}>Following</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start"
          }}
        >
          {following.map(follow => {
            return (
              <div
                key={follow.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Link
                  to={`/portfolio/${follow.id}/posts`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "#333"
                  }}
                >
                  <img
                    src={follow.avatar_url}
                    alt={follow.username}
                    style={{
                      height: "45px",
                      width: "45px",
                      objectFit: "cover",
                      objectPosition: "center",
                      borderRadius: "50%",
                      margin: "10px"
                    }}
                  />
                  <span>{follow.username}</span>
                </Link>
                {followingIDs.includes(follow.id) ? (
                  <button
                    className="unfollow-btn"
                    onClick={e => unfollowArtist(e, follow.id)}
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    className="follow-btn"
                    onClick={e => followArtist(e, follow.id)}
                  >
                    <IoMdPersonAdd style={{ marginRight: "5px" }} /> Follow
                  </button>
                )}
              </div>
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Following;
