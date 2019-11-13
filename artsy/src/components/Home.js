import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Jumbotron, Button, Container, Row, Col, Image } from 'react-bootstrap';
import designer from "../assets/designer.svg"
import camera from "../assets/camera.svg";
import post_image from "../assets/image_post.svg";

function Home() {
    const [photos, setPhotos] = useState([])

    useEffect(() => {
        axios.get("https://artsy-be.herokuapp.com/api/photos")
            .then(res => {
                console.log(res)
                setPhotos(res.data.photos)
            })
            .catch(err => {
                console.log({ err })
            })
    }, [])
    if (!photos) return <h1>Loading photos...</h1>
    return (
        <div>
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
            <Container>
                <Row>
                    {photos.map(photo => {
                        return (
                            <Col xs={10} md={8} lg={6} xl={4} key={photo.id}>
                                <Card border="light" style={{ marginBottom: "15px" }}>
                                    <Card.Img variant="top" src={photo.photo_url} alt={photo.title} style={{ height: '200px', objectFit: 'cover' }} />
                                    <Card.Body style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div style={{ display: "flex" }}>
                                            <Image
                                                roundedCircle
                                                src={photo.avatar_url}
                                                alt={photo.username}
                                                style={{ height: '40px', marginRight: '5px' }}
                                            />
                                            <p style={{ margin: "5px" }}>{photo.username}</p>
                                        </div>
                                        <span styles={{ alignSelf: 'flex-end' }}>{photo.likes} likes</span>
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