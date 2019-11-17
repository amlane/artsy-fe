import React, { useState } from "react";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";
import { Modal, Button, Form, Image, Figure } from 'react-bootstrap';
import { useCloudinaryWidget } from "./hooks/useCloudinaryWidget";

function AddNewPost({ getUserData }) {

    const [show, setShow] = useState(false);
    const [newPost, setNewPost] = useState({
        photo_url: "",
        title: "",
        description: ""
    })

    const [uploadWidget] = useCloudinaryWidget(newPost, setNewPost, "photo_url")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = e => {
        e.preventDefault();
        if (newPost.title === "" || newPost.photo_url === "") return;

        axiosWithAuth().post("https://artsy-be.herokuapp.com/api/photos", newPost)
            .then(res => {
                // console.log(res)
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


    return (
        <>
            <Button variant="info" onClick={handleShow} style={{ float: "right" }}>
                Add New Post
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Add New Post
                    </Modal.Title>
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
                        ) : (
                                <Figure style={{ display: 'flex', justifyContent: 'center' }}>
                                    <Figure.Image
                                        width={`60%`}
                                        alt="Upload an image"
                                        src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                                        onClick={uploadWidget}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </Figure>
                            )}
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