import React, { useState } from "react";
import { axiosWithAuth } from "./axiosWithAuth";

import { Modal, Button, Form, Image } from 'react-bootstrap';

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

        const requestBody = {
            photo_url: newPost.photo_url,
            title: newPost.title,
            description: newPost.description
        }

        if (newPost.title === "" || newPost.photo_url === "") return;

        axiosWithAuth().post("https://artsy-be.herokuapp.com/api/photos", requestBody)
            .then(res => {
                console.log(res)
                getUserData();
                handleClose();
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

    function checkUploadResult(result) {
        if (result.event === 'success') {
            setNewPost({ ...newPost, photo_url: result.info.secure_url })
        }
    }

    function uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: process.env.REACT_APP_CLOUD_NAME, upload_preset: process.env.REACT_APP_UPLOAD_PRESET },
            function (error, result) {
                console.log("Result", result);
                checkUploadResult(result)
            });
    }

    return (
        <>
            <Button variant="info" onClick={handleShow} style={{ float: "right" }}>
                New Post
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form onSubmit={handleSubmit} className="add-new-post">
                        {newPost.photo_url ? (
                            <>
                                <Form.Label>Image Preview:</Form.Label>
                                <Image
                                    src={newPost.photo_url}
                                    alt="image preview"
                                    style={{ display: "block", width: "60%" }}
                                />
                            </>
                        ) : <Button variant="info" onClick={uploadWidget} block>
                                Add a Photo
                            </Button>}
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={newPost.title}
                            required
                            onChange={e => setNewPost({ ...newPost, title: e.target.value })}
                        />
                        <Form.Label>description:</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={newPost.description}
                            onChange={e => setNewPost({ ...newPost, description: e.target.value })}
                        />
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="info" onClick={(e) => handleSubmit(e)}>
                        Add Item
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AddNewPost;