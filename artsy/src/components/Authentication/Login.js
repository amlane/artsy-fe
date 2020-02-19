import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { baseURL } from "../utils/config";

function Login(props) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    props.history.push("/");
  };

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!user.email || !user.password) {
      setErrorMsg("Email and Password are required");
    } else {
      setIsLoggingIn(true);
      axios
        .post(`${baseURL}/auth/login`, user)
        .then(res => {
          localStorage.setItem("token", res.data.token);
          setIsLoggingIn(false);
          setErrorMsg("");
          props.history.push(`/portfolio/${res.data.user.id}/posts`);
        })
        .catch(err => {
          setErrorMsg(err.response.data.message);
          setIsLoggingIn(false);
        });
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Log in</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              onChange={handleChange}
              value={user.email}
              name="email"
            />
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              onChange={handleChange}
              value={user.password}
              name="password"
            />
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
                "Login"
              )}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>
            New to Artsy? Sign up{" "}
            <Nav.Link
              style={{ display: "inline", padding: "0" }}
              href="/register"
            >
              here
            </Nav.Link>
            .
          </p>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;
