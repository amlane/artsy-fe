import React from "react";
import { Container, Row } from "react-bootstrap";
import AddNewPost from "./AddNewPost";
import Photo from "./Photo";

function MyPhotos({ user, getUserData }) {
    return (
        <Container>
            <AddNewPost getUserData={getUserData} />
            <h2>My Posts</h2>
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