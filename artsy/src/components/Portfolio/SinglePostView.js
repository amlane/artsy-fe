import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setFavsID, getPhotoById } from "../../actions";
import { Link } from "react-router-dom";
import moment from "moment";
import { axiosWithAuth } from "../utils/axiosWithAuth";
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
    console.log("I'm hungry");
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
        .post(`https://artsy-be.herokuapp.com/api/photos/${id}/like/`)
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
      .delete(`https://artsy-be.herokuapp.com/api/photos/${id}/unlike/`)
      .then(res => {
        dispatch(getUser());
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log("here", photo);
  if (!photo.title)
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
      <img src={photo.photo_url} alt={photo.title} className="main" />
      <section
        className="details"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 15px 0 0",
              borderBottom: "1px solid silver"
            }}
          >
            <Link
              to={`/portfolio/${photo.user_id}/posts`}
              style={{
                display: "flex",
                padding: "8px 0",
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
              <p style={{ margin: "5px" }}>{photo.username}</p>
            </Link>
            <Link to={`/edit-post/${photo.id}`}>
              {photo.user_id === decodedToken() ? (
                <FaEllipsisH
                  size="1.5em"
                  style={{ color: "gray", cursor: "pointer" }}
                />
              ) : null}
            </Link>
          </div>
          <h1>{photo.title}</h1>
          <p>{photo.description}</p>
        </div>
        <div>
          <span
            onClick={() =>
              localStorage.getItem("token") && favsID.includes(photo.id)
                ? unLike(photo.id)
                : addLike(photo.id)
            }
            style={{ display: "flex" }}
          >
            {favsID && favsID.includes(photo.id) ? (
              <FaStar
                size="1.5em"
                style={{
                  color: "#D4AF43",
                  cursor: "pointer",
                  marginRight: "5px"
                }}
              />
            ) : (
              <FaRegStar
                size="1.5em"
                style={{
                  color: "gray",
                  cursor: "pointer",
                  marginRight: "5px"
                }}
              />
            )}
            <span style={{ marginRight: "15px" }}>{photo.likes.count}</span>
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
            <span>{photo.comments.length}</span>
          </span>
          <div
            style={{
              width: "100%",
              color: "silver",
              fontSize: "12px",
              textTransform: "uppercase",
              padding: "10px 0",
              borderTop: "1px solid silver",
              marginTop: "2%"
            }}
          >
            {moment(photo.created_at).fromNow()}
          </div>
        </div>
        <div
          style={{
            overflowY: "scroll",
            maxHeight: "200px",
            margin: "20px 0 0 0"
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
