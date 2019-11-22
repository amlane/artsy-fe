import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../actions";
import axios from "axios";
import moment from "moment";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";
import { Image } from "react-bootstrap";
import Loader from "react-loader-spinner";

function SinglePostView(props) {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);
  const [userFavorites, setUserFavorites] = useState(null);
  const [favsID, setFavsID] = useState(null);

  useEffect(() => {
    console.log("check check");
    axios
      .get(
        `https://artsy-be.herokuapp.com/api/photos/${props.match.params.photoId}`
      )
      .then(res => {
        setPhoto(res.data.photo);
      })
      .catch(err => {
        console.log(err);
      });
  }, [userFavorites, props.match.params.photoId]);

  useEffect(() => {
    console.log("user useEffect");
    setUserFavorites(user.favorites);
  }, [user]);

  useEffect(() => {
    console.log("user favorites");
    if (userFavorites) {
      const favs = userFavorites.map(favs => {
        return favs.id;
      });
      setFavsID(favs);
    }
  }, [userFavorites]);

  const addLike = id => {
    if (!localStorage.getItem("token")) {
      props.history.push("/login");
    } else {
      axiosWithAuth()
        .post(`https://artsy-be.herokuapp.com/api/photos/${id}/like`)
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
      .delete(`https://artsy-be.herokuapp.com/api/photos/${id}/unlike`)
      .then(res => {
        dispatch(getUser());
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (!photo)
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
              borderBottom: "1px solid silver",
              padding: "8px"
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
                marginRight: "5px",
                objectPosition: "center"
              }}
            />
            <p style={{ margin: "5px" }}>{photo.username}</p>
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
          >
            <i
              className="fas fa-star"
              style={{
                color: favsID && favsID.includes(photo.id) ? "#D4AF43" : "gray",
                cursor: "pointer",
                fontSize: "24px",
                paddingBottom: "10px",
                paddingRight: "5px"
              }}
            ></i>
          </span>
          <span>{photo.likes.count}</span>
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
      </section>
    </div>
  );
}

export default SinglePostView;
