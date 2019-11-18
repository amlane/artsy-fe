import React from "react";
import { useSelector } from 'react-redux';
import { Card, Container, Row, Col } from "react-bootstrap";

function MyFavorites() {
    const user = useSelector(state => state.user)
    return (
        <Container style={{ marginTop: '25px' }}>
            <Row>
                {user && user.favorites.map(photo => {
                    return (
                        <Col xl={4} key={photo.id}>
                            <Card style={{ marginBottom: "15px", cursor: "pointer", border: '1px solid #E9ECEF' }}>
                                <Card.Img variant="top" src={photo.photo_url} alt={photo.title} style={{ height: '350px', objectFit: 'cover', objectPosition: 'center' }} />
                            </Card>
                        </Col>
                    )
                }).reverse()}
            </Row>
        </Container>
    )
}

export default MyFavorites;