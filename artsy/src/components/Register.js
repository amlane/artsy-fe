import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import Loader from "react-loader-spinner";

function Register(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.history.push("/");
  };
  // const handleShow = () => setShow(true);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    username: ""
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!newUser.email || !newUser.password || !newUser.username) {
      setErrorMsg("Email, Password & Username are required");
    } else {
      setIsLoggingIn(true);
      axios
        .post("https://artsy-be.herokuapp.com/api/auth/register", newUser)
        .then(res => {
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          props.history.push("/user/posts");
          setIsLoggingIn(false);
          setErrorMsg("");
        })
        .catch(err => {
          console.log({ err });
          setIsLoggingIn(false);
          setErrorMsg("Email is already associated with an Artsy account.");
        });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>email</Form.Label>
          <Form.Control
            type="email"
            onChange={handleChange}
            value={newUser.email}
            name="email"
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            type="password"
            onChange={handleChange}
            value={newUser.password}
            name="password"
          />
          <Form onSubmit={handleSubmit}>
            <Form.Label>username</Form.Label>
            <Form.Control
              type="username"
              onChange={handleChange}
              value={newUser.username}
              name="username"
            />
            <Form.Text className="text-muted">
              Your username can include spaces, letters, numbers, punctuations
              and special characters.
            </Form.Text>
            {errorMsg ? (
              <Form.Text className="text-muted">{errorMsg}</Form.Text>
            ) : null}
            <Button
              block
              size="lg"
              style={{ marginTop: "20px", backgroundColor: "#1C93B9" }}
              variant="info"
              type="submit"
              onClick={e => handleSubmit(e)}
            >
              {isLoggingIn ? (
                <Loader type="ThreeDots" color="#fff" height={30} width={30} />
              ) : (
                "Get Started"
              )}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>
            Already Artsy? Log in{" "}
            <Nav.Link style={{ display: "inline", padding: "0" }} href="/login">
              here
            </Nav.Link>
            .
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Register;
