import React from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

function MyFavorites() {
  const user = useSelector(state => state.user);
  return (
    <div className="my-photos">
      {user &&
        user.favorites
          .map(photo => {
            return (
              <Card key={photo.id} className="photo-card">
                <Card.Img
                  variant="top"
                  src={photo.photo_url}
                  alt={photo.title}
                />
              </Card>
            );
          })
          .reverse()}
    </div>
  );
}

export default MyFavorites;
