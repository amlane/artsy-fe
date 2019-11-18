import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from "../actions";
import { NavLink } from "react-router-dom";

import { Button, Card, Jumbotron } from "react-bootstrap";
import Loader from "react-loader-spinner";
import "../index.css"

import moment from "moment";

function UserDashboard() {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("dashboard rendered")
        dispatch(getUser())
    }, [dispatch])

    if (!user.username) return <Loader type="TailSpin" color="#1C93B9" height={100} width={100} style={{ display: 'flex', justifyContent: 'center', marginTop: '10%' }} />;
    return (
        <>
            <Jumbotron className="user-dashboard">
                <header>
                    <img className="avatar" src={user.avatar_url} alt={user.username} />
                    <Button className="mobile" variant="outline-secondary" href="/edit-profile">Edit Profile</Button>
                </header>
                <section>
                    <div>
                        <h1>{user.username}</h1>
                        <Button className="desktop" variant="outline-secondary" href="/edit-profile">Edit Profile</Button>
                    </div>
                    {/* <h2>About the Artist</h2> */}
                    <p>{user.about}</p>
                    <div className="main">
                        <p><i className="fas fa-palette"></i>{user.photos.length} posts</p>
                        <p><i className="fas fa-paint-brush"></i>Joined {moment(user.created_at).fromNow()}</p>
                        <p><i className="fas fa-map-marker-alt"></i>{user.location}</p>
                    </div>
                </section>
            </Jumbotron>
            <nav className="dashboard-nav">
                <NavLink to="/user/posts">Posts</NavLink>
                <NavLink to="/user/favorites">Favorites</NavLink>
            </nav>
        </>
    )
}

export default UserDashboard;