import React, { useState, useEffect } from "react";
import Axios from "axios";

import { Jumbotron, Image } from "react-bootstrap";

import AddNewPost from "./AddNewPost"
import MyPhotos from "./MyPhotos"

import jwt_decode from "jwt-decode"
import "../index.css"

function UserDashboard() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log("testing")
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

    if (!user) return <p>loading user...</p>;
    return (
        <>
            <Jumbotron>
                <Image roundedCircle style={{ height: '150px' }} src={user.avatar_url} alt={user.username} />
                <p>{user.email}</p>
            </Jumbotron>
            <AddNewPost getUserData={getUserData} />
            <MyPhotos user={user} getUserData={getUserData} />
        </>
    )
}

export default UserDashboard;