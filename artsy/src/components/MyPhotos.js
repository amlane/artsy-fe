import React, { useState, useEffect } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import AddNewPost from "./AddNewPost";
import Photo from "./Photo";
import jwt_decode from "jwt-decode"
import Axios from "axios";
import Loader from "react-loader-spinner"

function MyPhotos() {

    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = () => {
        var token = localStorage.getItem("token");
        var decoded = jwt_decode(token);

        Axios.get(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`)
            .then(res => {
                setUser(res.data.user)
            })
            .catch(err => {
                console.log({ err })
            })
    }
    //if (!user) return <Loader type="ThreeDots" color="#1C93B9" height={150} width={150} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '15vh' }} />;
    return (
        <Container style={{ marginTop: '25px' }}>
            <AddNewPost getUserData={getUserData} />
            <Row>
                {user && user.photos.map(photo => {
                    return (
                        <Photo key={photo.id} photo={photo} getUserData={getUserData} />
                    )
                }).reverse()}
            </Row>
        </Container>
    )
}

export default MyPhotos;