import React, { useState } from "react";
import axios from "axios";

import { Modal, Button } from 'react-bootstrap';

import jwt_decode from "jwt-decode"

function AddNewPost({ getUserData }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [newPost, setNewPost] = useState({
        photo_url: "",
        title: "",
        description: ""
    })

    const handleSubmit = e => {
        e.preventDefault();
        var token = localStorage.getItem("token");
        var decoded = jwt_decode(token);
        const requestBody = {
            photo_url: newPost.photo_url,
            title: newPost.title,
            description: newPost.description,
            user_id: decoded.subject
        }

        axios.post("https://artsy-be.herokuapp.com/api/photos", requestBody)
            .then(res => {
                console.log(res)
                getUserData();
                setNewPost({
                    photo_url: "",
                    title: "",
                    description: ""
                })
            })
            .catch(err => {
                console.log({ err })
            })
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Add Item
        </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={handleSubmit} className="add-new-post">
                        <label>Photo:</label>
                        <input
                            type="text"
                            name="photo_url"
                            value={newPost.photo_url}
                            onChange={e => setNewPost({ ...newPost, photo_url: e.target.value })}
                        />
                        <label>Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={newPost.title}
                            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                        />
                        <label>description:</label>
                        <input
                            type="text"
                            name="description"
                            value={newPost.description}
                            onChange={e => setNewPost({ ...newPost, description: e.target.value })}
                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={(e) => handleSubmit(e)}>
                        Add Item
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddNewPost;