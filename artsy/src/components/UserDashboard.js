import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from "../actions";

import { Button, Card } from "react-bootstrap";
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

    if (!user) return <Loader type="TailSpin" color="#1C93B9" height={100} width={100} style={{ marginLeft: '145px', marginTop: '145px' }} />;
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '25%' }}>
            <Card style={{ width: '18rem', margin: '0 0 0 3%', border: '1px solid #E9ECEF' }}>
                <Card.Header style={{ background: "#E9ECEF" }}>
                    <Button variant="outline-secondary" href="/user/posts" block>My Posts</Button>
                    <Button variant="outline-secondary" href="/user/favorites" block>My Favorites</Button>
                </Card.Header>
                <Card.Img variant="top" style={{ height: '260px', width: '100%', objectFit: 'cover', objectPosition: 'center' }} src={user.avatar_url} alt={user.username} />
                <Card.Body>
                    <Card.Title>{user.username}</Card.Title>
                    <Card.Text><i style={{ paddingRight: '5px' }} className="fas fa-palette"></i>Joined Artsy {moment(user.created_at).fromNow()}</Card.Text>
                    <Card.Text><i style={{ paddingRight: '5px' }} className="fas fa-map-marker-alt"></i>{user.location}</Card.Text>
                    <Card.Text><i style={{ paddingRight: '5px' }} className="fas fa-envelope"></i>{user.email}</Card.Text>
                    <Card.Subtitle>About the Artist</Card.Subtitle>
                    <Card.Text>{user.about}</Card.Text>
                    <Button variant="outline-secondary" href="/edit-profile">Edit Profile</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserDashboard;