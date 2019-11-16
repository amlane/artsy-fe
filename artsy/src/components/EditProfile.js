import React, { useState, useEffect } from 'react';
import Axios from "axios";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";

import { Form, Button, Row, Col, Figure, Image } from "react-bootstrap";

function EditProfile(props) {

    const [inputValue, setInputValue] = useState({
        username: "",
        location: "",
        about: "",
        avatar_url: ""
    })

    var token = localStorage.getItem("token");
    var decoded = jwt_decode(token);

    const getUserData = () => {
        Axios.get(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`)
            .then(res => {
                setInputValue({
                    username: res.data.user.username !== null ? res.data.user.username : "",
                    location: res.data.user.location !== null ? res.data.user.location : "",
                    about: res.data.user.about !== null ? res.data.user.about : ""
                })
            })
            .catch(err => {
                console.log({ err })
            })
    }

    useEffect(() => {
        getUserData();
    }, [])


    const handleChange = e => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log(inputValue)
        if (inputValue.avatar_url === "") {
            const requestBody = {
                username: inputValue.username,
                location: inputValue.location,
                about: inputValue.about
            }
            axiosWithAuth().put(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`, requestBody)
                .then(res => {
                    console.log(res)
                    props.history.push("/user")
                })
                .catch(err => {
                    console.log({ err })
                })
        } else {
            axiosWithAuth().put(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`, inputValue)
                .then(res => {
                    console.log(res)
                    props.history.push("/user")
                })
                .catch(err => {
                    console.log({ err })
                })
        }
    }

    function checkUploadResult(result) {
        if (result.event === 'success') {
            setInputValue({ ...inputValue, avatar_url: result.info.secure_url })
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
        <Form style={{ width: '60%', margin: '20px auto' }}>
            {inputValue.avatar_url ? (
                <Figure style={{ display: 'flex', justifyContent: 'center' }}>
                    <Form.Label>Profile Pic Preview:</Form.Label>
                    <Image
                        src={inputValue.avatar_url}
                        alt="image preview"
                        style={{ display: "block", width: "30%" }}
                    />
                </Figure>
            ) : (
                    <Figure style={{ display: 'flex', justifyContent: 'center' }}>
                        <Figure.Image
                            width={`30%`}
                            alt="Upload an image"
                            src="https://getstamped.co.uk/wp-content/uploads/WebsiteAssets/Placeholder.jpg"
                            onClick={uploadWidget}
                            style={{ cursor: 'pointer' }}
                        />
                    </Figure>
                )}
            <Row>
                <Col>
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
                            Your username can include spaces, letters, numbers, punctuations and special characters.
                </Form.Text>
                    </Form.Group>
                </Col>
                <Col>
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
                </Col>
            </Row>
            <Form.Group controlId="formUsername">
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
            <Button onClick={handleSubmit} style={{ backgroundColor: '#1C93B9' }} variant="info" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default withRouter(EditProfile);