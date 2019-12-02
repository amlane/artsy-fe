import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

function FriendPhotos(props) {
  const friend = useSelector(state => state.friend);

  if (!friend || friend.id !== +props.match.params.id)
    return (
      <h2
        style={{
          color: "gray",
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        Loading...
      </h2>
    );

  return (
    <div className="my-photos">
      {friend.photos.length !== 0 ? (
        friend.photos
          .map(photo => {
            return (
              <Link
                to={`/photo/${photo.id}`}
                className="photo-card"
                key={photo.id}
              >
                <img variant="top" src={photo.photo_url} alt={photo.title} />
              </Link>
            );
          })
          .reverse()
      ) : (
        <h3 style={{ textAlign: "center", width: "100%", color: "silver" }}>
          Nothing posted here yet
        </h3>
      )}
    </div>
  );
}

export default FriendPhotos;
