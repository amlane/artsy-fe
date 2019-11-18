import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { axiosWithAuth } from "./Authentication/axiosWithAuth";
import Loader from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import { withRouter } from "react-router-dom";
import { useCloudinaryWidget } from "./hooks/useCloudinaryWidget";
import { Form, Button, Row, Col, Figure, Image } from "react-bootstrap";

function EditProfile(props) {
    const user = useSelector(state => state.user)

    const [inputValue, setInputValue] = useState({
        username: "",
        location: "",
        about: "",
        avatar_url: ""
    })
    const [uploadWidget] = useCloudinaryWidget(inputValue, setInputValue, "avatar_url")

    useEffect(() => {
        console.log("checking")
        if (user.username) {
            setInputValue({
                username: user.username !== null ? user.username : "",
                location: user.location !== null ? user.location : "",
                about: user.about !== null ? user.about : "",
                avatar_url: user.avatar_url
            })
        }
    }, [user])

    const handleChange = e => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        var token = localStorage.getItem("token");
        var decoded = jwt_decode(token);

        axiosWithAuth().put(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`, inputValue)
            .then(res => {
                console.log(res)
                props.history.push("/user/posts")
            })
            .catch(err => {
                console.log({ err })
            })
    }
    console.log("editprofile", user)
    if (!user.username) return <Loader type="TailSpin" color="#1C93B9" height={200} width={200} style={{ display: 'flex', justifyContent: 'center', marginTop: '15vh' }} />;
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '10%' }}>

                <Figure style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', flexDirection: 'column' }}>
                    <Form.Label style={{ textAlign: 'center', cursor: 'pointer' }} onClick={uploadWidget}><i className="far fa-images"></i> Edit profile picture</Form.Label>
                    <Image
                        src={inputValue.avatar_url}
                        alt="image preview"
                        style={{ height: '350px', width: '65%', objectFit: 'cover', objectPosition: 'center', cursor: 'pointer' }}
                        onClick={uploadWidget}
                    />
                    <Form.Text className="text-muted">
                        Here is a preview of what your new profile picture will look like.
                   </Form.Text>
                </Figure>
            </div>
            <Form style={{ width: '60%', marginRight: '10%' }}>

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
                <Row>
                    <Col>
                        <Button block onClick={handleSubmit} style={{ backgroundColor: '#1C93B9', marginRight: '20px' }} variant="info" type="submit">
                            Submit
            </Button>
                    </Col>
                    <Col>
                        <Button block onClick={() => { props.history.push("/user/posts") }} variant="outline-secondary" type="submit">
                            Cancel
            </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default withRouter(EditProfile);