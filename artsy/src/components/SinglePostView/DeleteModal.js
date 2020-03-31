import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Modal, Dropdown, Form, Button } from "react-bootstrap";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import decodedToken from "../utils/decodedToken";
import { baseURL } from "../utils/config";

function DeleteModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deletePost = () => {
    console.log("home", props.photoId);
    axiosWithAuth()
      .delete(`${baseURL}/photos/${props.photoId}`)
      .then(res => {
        props.history.push(`/portfolio/${decodedToken()}/posts`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Delete</Dropdown.Item>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="header">
          <Modal.Title>Delete post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Text className="text-muted">
            Are you sure you want to delete this post? This cannot be undone.
          </Form.Text>
        </Modal.Body>
        <Modal.Footer className="delete-mdl">
          <Button className="delete-btn" onClick={deletePost}>
            Delete
          </Button>
          <Button onClick={handleClose} className="cancel-btn">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default withRouter(DeleteModal);
