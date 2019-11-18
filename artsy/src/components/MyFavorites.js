import React from "react";
import { useSelector } from 'react-redux';
import AddNewPost from "./AddNewPost";
import { Card, Container, Row, Col } from "react-bootstrap";

function MyFavorites() {
    const user = useSelector(state => state.user)
    return (
        <Container style={{ marginTop: '25px' }}>
            <AddNewPost />
            <Row>
                {user.favorites && user.favorites.map(photo => {
                    return (
                        <Col xl={3} key={photo.id}>
                            <Card style={{ marginBottom: "15px", cursor: "pointer", border: '1px solid #E9ECEF' }}>
                                <Card.Title style={{ padding: '10px 0 5px 10px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{photo.title}</Card.Title>
                                <Card.Img variant="top" src={photo.photo_url} alt={photo.title} style={{ height: '150px', objectFit: 'cover' }} />

                                <Card.Body style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <span styles={{}}>{photo.likes} <i className="fas fa-star" style={{ color: "#D4AF43" }}></i></span>
                                </Card.Body>
                            </Card>
                        </Col>
                    )
                }).reverse()}
            </Row>
        </Container>
    )
}

export default MyFavorites;