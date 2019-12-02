import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

function Following({ following }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(following);
  return (
    <>
      <div onClick={handleShow} style={{ cursor: "pointer" }}>
        <p>
          <span>{following && following.length}</span> following
        </p>
      </div>

      <Modal show={show} onHide={handleClose} centered scrollable="true">
        <Modal.Header closeButton>
          <Modal.Title>People you follow</Modal.Title>
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
              <Link
                key={follow.id}
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
            );
          })}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Following;
