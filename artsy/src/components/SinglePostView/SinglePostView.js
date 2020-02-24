import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setFavsID, getPhotoById } from "../../actions";
import { Link } from "react-router-dom";
import moment from "moment";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { baseURL } from "../utils/config";
import { Image } from "react-bootstrap";
import Loader from "react-loader-spinner";
import { FaEllipsisH, FaStar, FaRegStar, FaRegComment } from "react-icons/fa";
import decodedToken from "../utils/decodedToken";
import AddNewComment from "./AddNewComment";
import Comment from "./Comment";

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
            width: "100%"
          }}
        >
          <p style={{ margin: "0 5px" }}>{photo.username}</p>
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
        <Link to={`/edit-post/${photo.id}`}>
          {photo.user_id === decodedToken() ? (
            <FaEllipsisH
              size="1em"
              style={{ color: "silver", cursor: "pointer" }}
            />
          ) : null}
        </Link>
      </div>
      <div
        style={{ padding: "8px 10px", width: "100%" }}
        className="mobile-details"
      >
        <h2 style={{ fontSize: "20px" }}>{photo.title}</h2>
        <p>{photo.description}</p>
      </div>
      <img src={photo.photo_url} alt={photo.title} className="main" />
      <section
        className="details"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
              <p style={{ margin: "0 5px" }}>{photo.username}</p>
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
            <Link to={`/edit-post/${photo.id}`}>
              {photo.user_id === decodedToken() ? (
                <FaEllipsisH
                  size="1em"
                  style={{ color: "silver", cursor: "pointer" }}
                />
              ) : null}
            </Link>
          </div>
          <div style={{ padding: "8px" }} className="desktop-details">
            <h2 style={{ fontSize: "18px" }}>{photo.title}</h2>
            <p>{photo.description}</p>
          </div>
        </div>
        <div>
          <span
            onClick={() =>
              localStorage.getItem("token") && favsID.includes(photo.id)
                ? unLike(photo.id)
                : addLike(photo.id)
            }
            style={{
              display: "flex",
              padding: "10px 0",
              borderBottom: "1px solid #e9ecef"
            }}
          >
            {favsID && favsID.includes(photo.id) ? (
              <FaStar
                size="1.5em"
                style={{
                  color: "#D4AF43",
                  cursor: "pointer",
                  marginRight: "5px",
                  marginLeft: "5px"
                }}
              />
            ) : (
              <FaRegStar
                size="1.5em"
                style={{
                  color: "gray",
                  cursor: "pointer",
                  marginRight: "5px",
                  marginLeft: "5px"
                }}
              />
            )}
            <span style={{ marginRight: "15px" }}>
              {photo.likes.count} likes
            </span>
            <span>
              <FaRegComment
                size="1.5em"
                style={{
                  color: "gray",
                  cursor: "pointer",
                  marginRight: "5px",
                  transform: "scaleX(-1)"
                }}
              />
            </span>
            <span>{photo.comments.length} comments</span>
          </span>
        </div>
        <div
          style={{
            overflowY: "scroll",
            maxHeight: "200px",
            margin: "0px 0 0 0",
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
        {localStorage.getItem("token") && <AddNewComment photoId={photo.id} />}
      </section>
    </div>
  );
}

export default SinglePostView;
