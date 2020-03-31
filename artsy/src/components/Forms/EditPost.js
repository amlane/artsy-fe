import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { withRouter } from "react-router-dom";
import { useCloudinaryWidget } from "../hooks/useCloudinaryWidget";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import { FaRegImage } from "react-icons/fa";

function EditPost(props) {
  const [updatedPost, setUpdatedPost] = useState({
    photo_url: "",
    title: "",
    description: ""
  });

  const [uploadWidget] = useCloudinaryWidget(
    updatedPost,
    setUpdatedPost,
    "photo_url"
  );

  useEffect(() => {
    axiosWithAuth()
      .get(`${baseURL}/photos/${props.match.params.id}`)
      .then(res => {
        setUpdatedPost({
          photo_url:
            res.data.photo.photo_url !== null ? res.data.photo.photo_url : "",
          title: res.data.photo.title !== null ? res.data.photo.title : "",
          description:
            res.data.photo.description !== null
              ? res.data.photo.description
              : ""
        });
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const handleChange = e => {
    setUpdatedPost({
      ...updatedPost,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (updatedPost.title === "" || updatedPost.photo_url === "") return;

    axiosWithAuth()
      .put(`${baseURL}/photos/${props.match.params.id}`, updatedPost)
      .then(res => {
        props.history.push(`/photo/${props.match.params.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="add-new-post">
        <div className="image-preview">
          {updatedPost.photo_url === "" ? (
            <FaRegImage
              size="8em"
              onClick={uploadWidget}
              style={{ color: "#17A2B8", cursor: "pointer" }}
            />
          ) : (
            <Image
              src={updatedPost.photo_url}
              alt="image preview"
              onClick={uploadWidget}
            />
          )}
          <div>
            <Form.Label
              style={{ cursor: "pointer", color: "#17A2B8" }}
              onClick={uploadWidget}
            >
              Upload a photo
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
                  value={updatedPost.title}
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
              value={updatedPost.description}
              onChange={handleChange}
              className="text-area"
            />
          </Form.Group>
          <Row>
            <Col>
              <Button
                block
                onClick={() => {
                  props.history.push(`/photo/${props.match.params.id}`);
                }}
                className="cancel"
                variant="outline"
              >
                Cancel
              </Button>
            </Col>
            <Col>
              <Button
                block
                onClick={handleSubmit}
                className="submit"
                variant="info"
                type="submit"
              >
                Save
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </>
  );
}

export default withRouter(EditPost);
