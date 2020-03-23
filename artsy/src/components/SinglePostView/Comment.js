import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPhotoById } from "../../actions";
import moment from "moment";
import { TiDelete } from "react-icons/ti";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import decodedToken from "../utils/decodedToken";
import { baseURL } from "../utils/config";

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
          <div style={{ width: "100%" }}>
            <Link
              to={`/portfolio/${comment.user_id}/posts`}
              style={{
                color: "#333",
                fontWeight: "bolder",
                textDecoration: "none",
                margin: "0 5px 0 0",
                fontSize: "14px"
              }}
            >
              {comment.username}
            </Link>
            <span style={{ color: "gray", fontSize: "12px" }}>
              {moment(comment.created_at).fromNow()}
            </span>
          </div>
        </div>
        {comment.user_id === decodedToken() ? (
          <DeleteModal commentId={comment.id} photoId={photoId} />
        ) : null}
      </div>
      <div>
        <p
          style={{
            fontSize: "14px",
            color: "#000",
            margin: "-15px 0 20px 45px"
          }}
        >
          {comment.content}
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
      .delete(`${baseURL}/comments/${commentId}`)
      .then(res => {
        // console.log(res);
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
      <span
        variant="light"
        onClick={handleShow}
        style={{ marginRight: "15px", cursor: "pointer" }}
      >
        <TiDelete style={{ color: "silver", fontSize: "24px" }} />
      </span>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          Are you sure you want to delete your comment? This change is permanent
          and cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteComment}>
            Yes, delete
          </Button>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
