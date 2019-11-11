import React from "react";
import { Container, Row } from "react-bootstrap";
import Photo from "./Photo";

function MyPhotos({ user, getUserData }) {
    return (
        <Container>
            <h2>My Photos</h2>
            <Row>
                {user.photos.map(photo => {
                    return (
                        <Photo key={photo.id} photo={photo} getUserData={getUserData} />
                    )
                })}
            </Row>
        </Container>
    )
}

export default MyPhotos;