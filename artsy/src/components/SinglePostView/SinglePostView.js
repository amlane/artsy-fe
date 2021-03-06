import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setFavsID, getPhotoById } from "../../actions";
import { Link } from "react-router-dom";
import moment from "moment";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Image, Dropdown } from "react-bootstrap";
import { FaEllipsisH, FaRegHeart, FaHeart } from "react-icons/fa";
import decodedToken from "../utils/decodedToken";
import AddNewComment from "./AddNewComment";
import Comment from "./Comment";
import DeleteModal from "./DeleteModal";
import ThreeDotLoader from "../utils/ThreeDotLoader";

function SinglePostView(props) {
  const photo = useSelector(state => state.photo);

  const userFavorites = useSelector(state => state.userFavorites);
  const favsID = useSelector(state => state.favsID);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPhotoById(props.match.params.photoId));
  }, [dispatch, userFavorites, props.match.params.photoId]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setFavsID());
  }, [userFavorites, dispatch]);

  const addLike = id => {
    if (!localStorage.getItem("token")) {
      props.history.push("/login");
    } else {
      axiosWithAuth()
        .post(`${baseURL}/photos/${id}/like/`)
        .then(res => {
          dispatch(getUser());
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const unLike = id => {
    axiosWithAuth()
      .delete(`${baseURL}/photos/${id}/unlike/`)
      .then(res => {
        dispatch(getUser());
      })
      .catch(err => {
        console.log(err);
      });
  };
  if (!photo.title || photo.id !== +props.match.params.photoId)
    return <ThreeDotLoader />;

  return (
    <div className="single-photo-view">
      <div className="user-mobile">
        <Link
          to={`/portfolio/${photo.user_id}/posts`}
          style={{
            display: "flex",
            padding: "8px",
            textDecoration: "none",
            color: "#000"
          }}
        >
          <Image
            roundedCircle
            src={photo.avatar_url}
            alt={photo.username}
            style={{
              height: "40px",
              width: "40px",
              objectFit: "cover",
              objectPosition: "center"
            }}
          />
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "flex-start"
          }}
        >
          <p style={{ margin: "0 2px", fontSize: "16px", fontWeight: "bold" }}>
            {photo.username}
          </p>
          <p
            style={{
              color: "gray",
              fontSize: "10px",
              textTransform: "uppercase",
              margin: "0 2px"
            }}
          >
            {moment(photo.created_at).fromNow()}
          </p>
        </div>
        {photo.user_id === decodedToken() ? (
          <Dropdown alignRight variant="info">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <FaEllipsisH
                size="1em"
                style={{ color: "silver", cursor: "pointer" }}
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href={`/edit-post/${photo.id}`}>
                Edit
              </Dropdown.Item>
              <DeleteModal photoId={photo.id} />
            </Dropdown.Menu>
          </Dropdown>
        ) : null}
      </div>
      <div
        style={{ padding: "10px 20px", width: "100%" }}
        className="mobile-details"
      >
        <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>{photo.title}</h2>
        <p style={{ color: "gray" }}>{photo.description}</p>
      </div>
      <img src={photo.photo_url} alt={photo.title} className="main" />
      <section
        className="details"
        style={{
          display: "flex",
          flexDirection: "column",
          background: "#fff"
        }}
      >
        <div>
          <div className="user-desktop">
            <Link
              to={`/portfolio/${photo.user_id}/posts`}
              style={{
                display: "flex",
                padding: "8px",
                textDecoration: "none",
                color: "#000"
              }}
            >
              <Image
                roundedCircle
                src={photo.avatar_url}
                alt={photo.username}
                style={{
                  height: "40px",
                  width: "40px",
                  objectFit: "cover",
                  objectPosition: "center"
                }}
              />
            </Link>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
              }}
            >
              <Link
                to={`/portfolio/${photo.user_id}/posts`}
                style={{
                  margin: "0 5px",
                  fontWeight: "bold",
                  textDecoration: "none",
                  color: "#000"
                }}
              >
                {photo.username}
              </Link>
              <p
                style={{
                  color: "silver",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  margin: "0 5px"
                }}
              >
                {moment(photo.created_at).fromNow()}
              </p>
            </div>
            {photo.user_id === decodedToken() ? (
              <Dropdown alignRight variant="info">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  <FaEllipsisH
                    size="1em"
                    style={{ color: "silver", cursor: "pointer" }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href={`/edit-post/${photo.id}`}>
                    Edit
                  </Dropdown.Item>
                  <DeleteModal photoId={photo.id} />
                </Dropdown.Menu>
              </Dropdown>
            ) : null}
          </div>
          <div style={{ padding: "8px" }} className="desktop-details">
            <h2 style={{ fontSize: "24px" }}>{photo.title}</h2>
            <p style={{ color: "gray", fontSize: "14px" }}>
              {photo.description}
            </p>
          </div>

          <div>
            <span
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "15px 25px 15px 10px"
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() =>
                  localStorage.getItem("token") && favsID.includes(photo.id)
                    ? unLike(photo.id)
                    : addLike(photo.id)
                }
              >
                {favsID && favsID.includes(photo.id) ? (
                  <FaHeart
                    size="1.5em"
                    style={{
                      color: "crimson",
                      cursor: "pointer",
                      marginRight: "5px",
                      marginLeft: "5px"
                    }}
                  />
                ) : (
                  <FaRegHeart
                    size="1.5em"
                    style={{
                      color: "#999999",
                      cursor: "pointer",
                      marginRight: "5px",
                      marginLeft: "5px"
                    }}
                  />
                )}
                <span
                  style={{
                    marginRight: "15px",
                    color: "gray",
                    fontSize: "14px"
                  }}
                >
                  {photo.likes.count} likes
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                {photo.comments.length > 0 ? (
                  <span style={{ color: "gray", fontSize: "14px" }}>
                    {photo.comments.length} comments
                  </span>
                ) : null}
              </div>
            </span>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #e9ecef",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              overflowY: "scroll",
              maxHeight: "350px",
              margin: 0,
              padding: "10px 0 0 8px",
              background: "#fff"
            }}
            className="scroll"
          >
            {photo.comments.map((comment, index) => {
              return (
                <Comment
                  comment={comment}
                  key={index + comment.id}
                  photoId={photo.id}
                />
              );
            })}
          </div>
          <div>
            {localStorage.getItem("token") && (
              <AddNewComment photoId={photo.id} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SinglePostView;
