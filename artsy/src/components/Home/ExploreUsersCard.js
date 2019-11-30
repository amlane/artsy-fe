import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { IoMdPersonAdd } from "react-icons/io";

function ExploreUsersCard({
  user,
  getFollowerIds,
  getFollowingIds,
  followArtist,
  unfollowArtist
}) {
  return (
    <Card
      style={{
        width: "9rem",
        margin: "5px"
      }}
    >
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Link
          to={`/portfolio/${user.id}/posts`}
          style={{
            color: "#000",
            textDecoration: "none",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Card.Img
            variant="top"
            src={user.avatar_url}
            style={{
              borderRadius: "50%",
              height: "70px",
              width: "70px",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />

          <Card.Text
            style={{
              whiteSpace: "nowrap",
              overflowX: "hidden",
              textOverflow: "ellipsis",
              width: "9rem",
              textAlign: "center"
            }}
          >
            {user.username}
          </Card.Text>
        </Link>
        {getFollowerIds.includes(user.id) ? (
          <p style={{ color: "gray", fontSize: "12px" }}>follows you</p>
        ) : (
          <p style={{ color: "gray", fontSize: "12px" }}>new to Artsy</p>
        )}
        {!getFollowingIds.includes(user.id) ? (
          <Button
            size="sm"
            variant="info"
            style={{
              background: "#17a2b8",
              borderRadius: "20px",
              color: "#fff",
              display: "flex",
              alignItems: "center"
            }}
            onClick={e => followArtist(e, user.id)}
          >
            <IoMdPersonAdd style={{ marginRight: "5px" }} /> Follow
          </Button>
        ) : (
          <Button
            size="sm"
            variant="info"
            style={{
              background: "#fff",
              borderRadius: "20px",
              color: "#17a2b8",
              display: "flex",
              alignItems: "center",
              border: "1px solid #17a2b8"
            }}
            onClick={e => unfollowArtist(e, user.id)}
          >
            Unfollow
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ExploreUsersCard;
