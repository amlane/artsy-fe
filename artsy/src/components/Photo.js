import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../actions";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";

import { Card, Modal, Button, Col } from "react-bootstrap";

function Photo({ photo }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deletePhoto = (e, id) => {
    e.preventDefault();
    axiosWithAuth()
      .delete(`https://artsy-be.herokuapp.com/api/photos/${id}`)
      .then(res => {
        console.log(res);
        dispatch(getUser());
        handleClose();
      })
      .catch(err => {
        console.log({ err });
      });
  };

  return (
    <>
      <Card onClick={handleShow} className="photo-card">
        <img variant="top" src={photo.photo_url} alt={photo.title} />
      </Card>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <img
            src={photo.photo_url}
            style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }}
            alt={photo.title}
          />
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>{photo.title}</Modal.Title>
          <p style={{ padding: "15px" }}>{photo.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={e => deletePhoto(e, photo.id)}>
            Delete Item
          </Button>
          <Button type="submit" variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Photo;
