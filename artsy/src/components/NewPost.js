import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../actions";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";
import { withRouter } from "react-router-dom";
import { useCloudinaryWidget } from "./hooks/useCloudinaryWidget";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import decodedToken from "./utils/decodedToken";

function NewPost(props) {
  const dispatch = useDispatch();

  const [newPost, setNewPost] = useState({
    photo_url: "",
    title: "",
    description: ""
  });

  const [uploadWidget] = useCloudinaryWidget(newPost, setNewPost, "photo_url");

  const handleChange = e => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (newPost.title === "" || newPost.photo_url === "") return;

    axiosWithAuth()
      .post("https://artsy-be.herokuapp.com/api/photos", newPost)
      .then(res => {
        dispatch(getUser());
        props.history.push(`/user/${decodedToken()}/posts`);
        setNewPost({
          photo_url: "",
          title: "",
          description: ""
        });
      })
      .catch(err => {
        console.log({ err });
      });
  };

  return (
    <div className="add-new-post">
      <div className="image-preview">
        {newPost.photo_url === "" ? (
          <Image
            src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
            alt="image preview"
            onClick={uploadWidget}
          />
        ) : (
          <Image
            src={newPost.photo_url}
            alt="image preview"
            onClick={uploadWidget}
          />
        )}
        <div>
          <Form.Label
            style={{ textAlign: "center", cursor: "pointer", color: "#17A2B8" }}
            onClick={uploadWidget}
          >
            <i className="far fa-images"></i> Upload a picture of your art
          </Form.Label>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <section>
          <div>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Title"
                name="title"
                value={newPost.title}
                onChange={handleChange}
              />
            </Form.Group>
          </div>
        </section>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Tell us about your art..."
            name="description"
            value={newPost.description}
            onChange={handleChange}
            className="text-area"
          />
        </Form.Group>
        <Row>
          <Col>
            <Button
              block
              onClick={() => {
                props.history.push(`/user/${decodedToken()}/posts`);
              }}
              variant="outline-secondary"
            >
              Cancel
            </Button>
          </Col>
          <Col>
            <Button
              block
              onClick={handleSubmit}
              style={{ backgroundColor: "#1C93B9", marginRight: "20px" }}
              variant="info"
              type="submit"
            >
              Save
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default withRouter(NewPost);
