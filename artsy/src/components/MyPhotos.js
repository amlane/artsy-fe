import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

function MyPhotos() {
  const user = useSelector(state => state.user);

  if (!user)
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
      {user.photos !== 0 ? (
        user.photos
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

export default MyPhotos;
