import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function MyFollowers({ followers }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(followers);
  return (
    <>
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        <p>
          <span>{followers && followers.length}</span> followers
        </p>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>People who follow you</Modal.Title>
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
              <Link
                key={follower.id}
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
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MyFollowers;
