import React, { useState } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

function Login(props) {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [user, setUser] = useState({
        email: "amanda@email.com",
        password: "1234"
    })

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post("https://artsy-be.herokuapp.com/api/auth/login", user)
            .then(res => {
                console.log(res.data)
                localStorage.setItem("token", res.data.token)
                props.history.push("/user")
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
                        <Form.Label>username</Form.Label>
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="info" onClick={(e) => handleSubmit(e)}>
                        Login
                   </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default Login;