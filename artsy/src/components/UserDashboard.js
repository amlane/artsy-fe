import React, { useState, useEffect } from "react";
import Axios from "axios";
import Loader from "react-loader-spinner";
import moment from "moment";
import { Button, Card } from "react-bootstrap";
import jwt_decode from "jwt-decode"
import "../index.css"

function UserDashboard() {
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

    if (!user) return <Loader type="TailSpin" color="#1C93B9" height={100} width={100} style={{ marginLeft: '145px', marginTop: '145px' }} />;
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', width: '25%' }}>
            <Card style={{ width: '18rem', margin: '0 0 0 3%', border: '1px solid #E9ECEF' }}>
                <Card.Header>
                    <Button variant="outline-secondary" href="/user/posts" block>My Posts</Button>
                    <Button variant="outline-secondary" href="/user/favorites" block>My Favorites</Button>
                </Card.Header>
                <Card.Img variant="top" rounded style={{ height: '260px', width: '100%', objectFit: 'cover', objectPosition: 'center' }} src={user.avatar_url} alt={user.username} />
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