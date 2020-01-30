import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPhotoById } from "../../actions";
import moment from "moment";
import { FaEllipsisV } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import decodedToken from "../utils/decodedToken";

function Comment({ comment, photoId }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0",
          alignItems: "flex-start",
          width: "100%"
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "flex-start",
            marginRight: "0"
          }}
        >
          <Link to={`/portfolio/${comment.user_id}/posts`}>
            <img
              src={comment.avatar_url}
              alt={comment.username}
              style={{
                height: "35px",
                width: "35px",
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "50%",
                margin: "5px 10px 0 0"
              }}
            />
          </Link>
          <div style={{ marginTop: "7px", width: "100%" }}>
            <Link
              to={`/portfolio/${comment.user_id}/posts`}
              style={{
                fontWeight: "bolder",
                color: "#333",
                textDecoration: "none"
              }}
            >
              {comment.username}
            </Link>{" "}
            {comment.content}{" "}
          </div>
        </div>
        {comment.user_id === decodedToken() ? (
          <DeleteModal commentId={comment.id} photoId={photoId} />
        ) : null}
      </div>
      <div>
        <p
          style={{
            fontSize: "12px",
            color: "gray",
            marginLeft: "50px"
          }}
        >
          {moment(comment.created_at).fromNow()}
        </p>
      </div>
    </>
  );
}

export default Comment;

function DeleteModal({ commentId, photoId }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteComment = e => {
    e.preventDefault();

    axiosWithAuth()
      .delete(`https://artsy-be.herokuapp.com/api/comments/${commentId}`)
      .then(res => {
        console.log(res);
        dispatch(getPhotoById(photoId));
        handleClose();
      })
      .catch(err => {
        console.log(err);
      });
  };
  // console.log(commentId);
  return (
    <>
      <Button variant="none" onClick={handleShow}>
        <FaEllipsisV style={{ color: "gray" }} />
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          Are you sure you want to delete your comment? This change is permanent
          and cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteComment}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
