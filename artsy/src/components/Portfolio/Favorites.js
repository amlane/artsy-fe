import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Favorites() {
  const friend = useSelector(state => state.friend);
  return (
    <div className="my-photos">
      {friend.favorites.length !== 0 ? (
        friend.favorites
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
          Nothing here yet
        </h3>
      )}
    </div>
  );
}

export default Favorites;
