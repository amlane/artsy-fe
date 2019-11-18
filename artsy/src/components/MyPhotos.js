import React from "react";
import { useSelector } from 'react-redux';

import { Container, Row } from "react-bootstrap";
import AddNewPost from "./AddNewPost";
import Photo from "./Photo";
import Loader from "react-loader-spinner"

function MyPhotos() {
    const user = useSelector(state => state.user)

    if (!user) return <Loader type="ThreeDots" color="#1C93B9" height={150} width={150} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15vh' }} />;

    return (
        <Container style={{ marginTop: '25px' }}>
            <AddNewPost />
            <Row>
                {user.photos && user.photos.map(photo => {
                    return (
                        <Photo key={photo.id} photo={photo} />
                    )
                }).reverse()}
            </Row>
        </Container>
    )
}

export default MyPhotos;