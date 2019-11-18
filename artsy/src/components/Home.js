import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Container, Row, Col, Image } from 'react-bootstrap';
import Loader from "react-loader-spinner";
import jwt_decode from "jwt-decode"
import Axios from "axios";
import HomeHero from "./HomeHero";


import { axiosWithAuth } from "./Authentication/axiosWithAuth";

function Home(props) {
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
        if (!localStorage.getItem("token")) {
            props.history.push("/login")
        } else {
            axiosWithAuth().post(`https://artsy-be.herokuapp.com/api/photos/${id}/like`)
                .then(res => {
                    setPhotos(res.data.photos)
                    getUserData();
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const unLike = (id) => {
        // if (!localStorage.getItem("token")) return console.log("You must be logged in");
        axiosWithAuth().delete(`https://artsy-be.herokuapp.com/api/photos/${id}/unlike`)
            .then(res => {
                setPhotos(res.data.photos)
                getUserData();
            })
            .catch(err => {
                console.log(err)
            })
    }


    //console.log(userFavorites)
    if (!photos) return <Loader type="TailSpin" color="#1C93B9" height={200} width={200} style={{ display: 'flex', justifyContent: 'center', marginTop: '15vh' }} />;
    return (
        <div>
            <HomeHero />
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
                                        <span onClick={() => localStorage.getItem("token") && favsID.includes(photo.id) ? unLike(photo.id) : addLike(photo.id)}>{photo.likes} <i className="fas fa-star" style={{ color: favsID && favsID.includes(photo.id) ? "#D4AF43" : "gray", cursor: "pointer" }}></i></span>
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