import React, { useState } from "react";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";

import { Card, Modal, Button, Col } from 'react-bootstrap';

function Photo({ photo, getUserData }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const deletePhoto = (e, id) => {
        e.preventDefault();
        axiosWithAuth()
            .delete(`https://artsy-be.herokuapp.com/api/photos/${id}`)
            .then(res => {
                console.log(res);
                handleClose();
                getUserData();
            })
            .catch(err => {
                console.log({ err })
            })
    }

    return (
        <>
            <Col xl={3}>
                <Card onClick={handleShow} style={{ marginBottom: "15px", cursor: "pointer", border: '1px solid #E9ECEF' }}>
                    <Card.Title style={{ padding: '10px 0 5px 10px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{photo.title}</Card.Title>
                    <Card.Img variant="top" src={photo.photo_url} alt={photo.title} style={{ height: '150px', objectFit: 'cover' }} />

                    <Card.Body style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <span styles={{}}>{photo.likes} <i className="fas fa-star" style={{ color: "#D4AF43" }}></i></span>
                    </Card.Body>
                </Card>
            </Col>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header>
                    <img src={photo.photo_url} style={{ maxHeight: '400px', width: '100%', objectFit: 'cover' }} alt={photo.title} />
                </Modal.Header>
                <Modal.Body>
                    <Modal.Title>{photo.title}</Modal.Title>
                    <p style={{ padding: '15px' }}>{photo.description}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={(e) => deletePhoto(e, photo.id)}>
                        Delete Item
                    </Button>
                    <Button type="submit" variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Photo;