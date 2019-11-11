import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Jumbotron, Button, Container, Row, Col, Image } from 'react-bootstrap';

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
            <Jumbotron style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80")', height: '450px', backgroundRepeat: 'no-repeat', objectFit: 'cover', backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>
                <div style={{ position: "absolute", top: '28%', right: '15%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ fontSize: "64px" }}>Are you <span style={{ fontFamily: 'Megrim, cursive' }}>Artsy?</span></h1>
                    <Button variant="outline-info" size="lg">Get Started</Button>
                </div>
            </Jumbotron>
            <Container>
                <Row>
                    {photos.map(photo => {
                        return (
                            <Col xs={10} md={8} lg={6} xl={4} key={photo.id}>
                                <Card style={{ marginBottom: "15px" }}>
                                    <Card.Header style={{ display: 'flex', alignItems: 'center' }}>
                                        <Image
                                            roundedCircle
                                            src={photo.avatar_url}
                                            alt={photo.username}
                                            style={{ height: '55px', margin: '5px' }}
                                        />
                                        <p style={{ margin: "5px" }}>{photo.username}</p>
                                    </Card.Header>
                                    <Card.Img variant="top" src={photo.photo_url} alt={photo.title} style={{ height: '275px', objectFit: 'cover' }} />
                                    <Card.Body>

                                        <Card.Title>{photo.title}</Card.Title>
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