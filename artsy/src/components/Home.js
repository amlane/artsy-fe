import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Jumbotron, Button, Container, Row, Col, Image } from 'react-bootstrap';
import Loader from "react-loader-spinner";
import jwt_decode from "jwt-decode"
import Axios from "axios";

import designer from "../assets/designer.svg"
import camera from "../assets/camera.svg";
import post_image from "../assets/image_post.svg";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";

function Home() {
    const [photos, setPhotos] = useState(null)
    const [userFavorites, setUserFavorites] = useState(null)
    const [favsID, setFavsID] = useState(null);


    const getUserData = () => {
        var token = localStorage.getItem("token");
        if (token) {
            var decoded = jwt_decode(token);
            Axios.get(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`)
                .then(res => {
                    setUserFavorites(res.data.user.favorites)
                })
                .catch(err => {
                    console.log({ err })
                })
        }
    }

    useEffect(() => {
        getUserData();
        axios.get("https://artsy-be.herokuapp.com/api/photos")
            .then(res => {
                setPhotos(res.data.photos)
            })
            .catch(err => {
                console.log({ err })
            })
    }, [])

    useEffect(() => {
        if (userFavorites) {
            const favs = userFavorites.map(favs => {
                return favs.id
            })
            setFavsID(favs)
        }
    }, [userFavorites])

    const addLike = (id) => {
        axiosWithAuth().post(`https://artsy-be.herokuapp.com/api/photos/${id}/like`)
            .then(res => {
                setPhotos(res.data.photos)
                getUserData();
            })
            .catch(err => {
                console.log(err)
            })
    }

    const unLike = (id) => {
        axiosWithAuth().delete(`https://artsy-be.herokuapp.com/api/photos/${id}/unlike`)
            .then(res => {
                setPhotos(res.data.photos)
                getUserData();
            })
            .catch(err => {
                console.log(err)
            })
    }


    console.log(userFavorites)
    if (!photos) return <Loader type="TailSpin" color="#1C93B9" height={200} width={200} style={{ display: 'flex', justifyContent: 'center', marginTop: '15vh' }} />;
    return (
        <div>
            {!localStorage.getItem("token") ? (
                <Jumbotron style={{ textAlign: 'center' }}>
                    <h1 style={{ marginBottom: "30px", fontWeight: 'lighter' }}>Are you <span style={{ fontFamily: 'Megrim, cursive' }}>Artsy?</span></h1>
                    <Container>
                        <Row style={{}}>
                            <Col>
                                <Image
                                    src={designer}
                                    alt="designer"
                                    style={{ width: '80%' }}
                                />
                                <h3 style={{ marginTop: '20px' }}>Create your art</h3>
                            </Col>
                            <Col>
                                <Image
                                    src={camera}
                                    alt="camera"
                                    style={{ width: '80%' }}
                                />
                                <h3 style={{ marginTop: '20px' }}>Snap a photo</h3>
                            </Col>
                            <Col>
                                <Image
                                    src={post_image}
                                    alt="posting an image"
                                    style={{ width: '70%' }}
                                />
                                <h3 style={{ marginTop: '20px' }}>Share with the world</h3>
                            </Col>
                        </Row>
                    </Container>
                    <Button style={{ marginTop: '30px', backgroundColor: '#1C93B9' }} variant="info" size="lg" href="/register">Get Started</Button>
                </Jumbotron>
            ) : null}

            <Container>
                <Row>
                    {photos.map(photo => {
                        return (
                            <Col xl={3} key={photo.id}>
                                <Card style={{ marginBottom: "15px", border: '1px solid #E9ECEF' }}>
                                    <Card.Header style={{}}>
                                        <div style={{ display: "flex" }}>
                                            <Image
                                                roundedCircle
                                                src={photo.avatar_url}
                                                alt={photo.username}
                                                style={{ height: '40px', width: '40px', objectFit: 'cover', marginRight: '5px', objectPosition: 'center' }}
                                            />
                                            <p style={{ margin: "5px" }}>{photo.username}</p>
                                        </div>
                                    </Card.Header>
                                    <Card.Img variant="top" src={photo.photo_url} alt={photo.title} style={{ height: '150px', objectFit: 'cover', objectPosition: 'center' }} />
                                    <Card.Body style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        {}
                                        <span onClick={() => favsID.includes(photo.id) ? unLike(photo.id) : addLike(photo.id)}>{photo.likes} <i className="fas fa-star" style={{ color: favsID && favsID.includes(photo.id) ? "#D4AF43" : "gray", cursor: "pointer" }}></i></span>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Container>
        </div>
    )
}

export default Home;