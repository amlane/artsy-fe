import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loader from "react-loader-spinner";
import moment from "moment";
import { Jumbotron, Image } from "react-bootstrap";

import MyPhotos from "./MyPhotos"

import jwt_decode from "jwt-decode"
import "../index.css"

function UserDashboard() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUserData();
    }, [])

    const getUserData = () => {
        var token = localStorage.getItem("token");
        if (token) {
            var decoded = jwt_decode(token);

            Axios.get(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`)
                .then(res => {
                    setUser(res.data.user)
                })
                .catch(err => {
                    console.log({ err })
                })
        } else {
            console.log("no user")
        }
    }

    if (!user) return <Loader type="TailSpin" color="#1C93B9" height={200} width={200} style={{ display: 'flex', justifyContent: 'center', marginTop: '15vh' }} />;
    console.log(user)
    return (
        <>
            <Jumbotron style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Image rounded style={{ height: '150px' }} src={user.avatar_url} alt={user.username} />
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <p>{user.location}</p>
                <p>Joined Artsy {moment(user.created_at).fromNow()}</p>
            </Jumbotron>
            <MyPhotos user={user} getUserData={getUserData} />
        </>
    )
}

export default UserDashboard;