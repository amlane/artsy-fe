import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

function FriendPhotos() {
  const friend = useSelector(state => state.friend);

  if (!friend)
    return (
      <Loader
        type="ThreeDots"
        color="#1C93B9"
        height={150}
        width={150}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15vh"
        }}
      />
    );

  return (
    <div className="my-photos">
      {friend &&
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
          .reverse()}
    </div>
  );
}

export default FriendPhotos;
