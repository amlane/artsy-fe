import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Nav } from "react-bootstrap";
import Loader from "react-loader-spinner";

function Login(props) {
    const [show, setShow] = useState(true);

    const handleClose = () => {
        setShow(false)
        props.history.push("/")
    }
    // const handleShow = () => setShow(true);

    const [user, setUser] = useState({
        email: "amanda@email.com",
        password: "1234"
    });
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoggingIn(true);
        axios.post("https://artsy-be.herokuapp.com/api/auth/login", user)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                props.history.push("/user")
                setIsLoggingIn(false);
            })
            .catch(err => {
                console.log({ err })
            })
    }

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
                    </Form>
                    <Button block size="lg" style={{ marginTop: '20px' }} variant="info" onClick={(e) => handleSubmit(e)}>
                        {isLoggingIn ? <Loader type="ThreeDots" color="#fff" height={30} width={30} /> : "Login"}
                    </Button>
                </Modal.Body>
                <Modal.Footer>
                    <p>New to Artsy? Sign up <Nav.Link style={{ display: 'inline', padding: '0' }} href="/register">here</Nav.Link>.</p>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Login;