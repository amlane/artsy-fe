import React from "react";
import { Card, Button } from "react-bootstrap";

function MyPhotos({ user }) {
    return (
        <div>
            <h2>My Photos</h2>
            <div style={{ display: 'flex' }}>
                {user.photos.map(photo => {
                    return (
                        <Card key={photo.id} style={{ width: '18rem', height: 'auto', margin: '10px' }}>
                            <Card.Img variant="top" src={photo.photo_url} alt={photo.title} style={{ height: '15rem', objectFit: 'cover' }} />
                            <Card.Body>
                                <Card.Title>{photo.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export default MyPhotos;