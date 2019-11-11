import React from "react";
import Photo from "./Photo";

function MyPhotos({ user, getUserData }) {
    return (
        <div>
            <h2>My Photos</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {user.photos.map(photo => {
                    return (
                        <Photo photo={photo} getUserData={getUserData} />
                    )
                })}
            </div>
        </div>
    )
}

export default MyPhotos;