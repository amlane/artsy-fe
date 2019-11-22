import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";
import Loader from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { useCloudinaryWidget } from "./hooks/useCloudinaryWidget";
import { Form, Button, Row, Col, Image } from "react-bootstrap";

function EditProfile(props) {
  const user = useSelector(state => state.user);

  const [inputValue, setInputValue] = useState({
    username: "",
    location: "",
    about: "",
    avatar_url: ""
  });
  const [uploadWidget] = useCloudinaryWidget(
    inputValue,
    setInputValue,
    "avatar_url"
  );

  useEffect(() => {
    console.log("checking");
    if (user.username) {
      setInputValue({
        username: user.username !== null ? user.username : "",
        location: user.location !== null ? user.location : "",
        about: user.about !== null ? user.about : "",
        avatar_url: user.avatar_url
      });
    }
  }, [user]);

  const handleChange = e => {
    setInputValue({
      ...inputValue,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);

    axiosWithAuth()
      .put(
        `https://artsy-be.herokuapp.com/api/users/${decoded.subject}`,
        inputValue
      )
      .then(res => {
        props.history.push("/user/posts");
      })
      .catch(err => {
        console.log({ err });
      });
  };

  if (!user.username)
    return (
      <Loader
        type="ThreeDots"
        color="#1C93B9"
        height={150}
        width={150}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15vh"
        }}
      />
    );
  return (
    <div className="edit-profile">
      <div className="image-preview">
        <Image
          src={inputValue.avatar_url}
          alt="image preview"
          onClick={uploadWidget}
        />
        <div>
          <h1>{user.username}</h1>
          <Form.Label
            style={{ textAlign: "center", cursor: "pointer", color: "#17A2B8" }}
            onClick={uploadWidget}
          >
            <i className="far fa-images"></i> Change Profile Pic
          </Form.Label>
        </div>
      </div>

      <form>
        <section>
          <div>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                value={inputValue.username}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Your username can include spaces, letters, numbers, punctuations
                and special characters.
              </Form.Text>
            </Form.Group>
          </div>
          <div>
            <Form.Group controlId="formLocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Location"
                name="location"
                value={inputValue.location}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Example: "Eugene, Oregon"
              </Form.Text>
            </Form.Group>
          </div>
        </section>
        <Form.Group controlId="formAbout">
          <Form.Label>About</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            placeholder="Tell us about yourself..."
            name="about"
            value={inputValue.about}
            onChange={handleChange}
          />
        </Form.Group>
        <Row>
          <Col>
            <Button
              block
              onClick={() => {
                props.history.push("/user/posts");
              }}
              variant="outline-secondary"
              type="submit"
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

export default withRouter(EditProfile);
