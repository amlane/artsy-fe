import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyFavorites() {
  const user = useSelector(state => state.user);
  return (
    <div className="my-photos">
      {user &&
        user.favorites
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

export default MyFavorites;
