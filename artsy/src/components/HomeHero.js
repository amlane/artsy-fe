import React from "react";
import { Jumbotron, Button, Container, Row, Col, Image } from 'react-bootstrap';
// photos
import designer from "../assets/designer.svg"
import camera from "../assets/camera.svg";
import post_image from "../assets/image_post.svg";

function HomeHero() {
    return (
        <>
            {!localStorage.getItem("token") ? (
                <Jumbotron style={{ textAlign: 'center', background: "#fafafa" }}>
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
        </>
    )
}

export default HomeHero;