import React, { useState, useEffect } from "react";
import Axios from "axios";

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
                    console.log("res", res.data)
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
            <div className="user-card">
                <img className="profile-pic" src={user.avatar_url} alt={user.username} />
                <p>{user.email}</p>
            </div>
            <AddNewPost getUserData={getUserData} />
            <MyPhotos user={user} />
        </>
    )
}

export default UserDashboard;