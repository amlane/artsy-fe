import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setFavsID } from "../../actions";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import Loader from "react-loader-spinner";
import HomeHero from "./HomeHero";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { baseURL } from "../utils/config";
import ThreeDotLoader from "../utils/ThreeDotLoader";

function Home(props) {
  const userFavorites = useSelector(state => state.userFavorites);
  const favsID = useSelector(state => state.favsID);
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    dispatch(getUser());
    axios
      .get(`${baseURL}/photos`)
      .then(res => {
        setPhotos(res.data.photos);
      })
      .catch(err => {
        console.log({ err });
      });
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
          setPhotos(res.data.photos);
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
        setPhotos(res.data.photos);
        dispatch(getUser());
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (!photos) return <ThreeDotLoader />;

  return (
    <div className="home-page">
      <HomeHero />
      <section>
        <div className="photos">
          {photos
            .map(photo => {
              return (
                <Card key={photo.id} className="card">
                  <Link
                    to={`/portfolio/${photo.user_id}/posts`}
                    style={{
                      display: "flex",
                      padding: "3%",
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
                        marginRight: "5px",
                        objectPosition: "center",
                        cursor: "pointer"
                      }}
                    />
                    <p style={{ margin: "5px", cursor: "pointer" }}>
                      {photo.username}
                    </p>
                  </Link>
                  <Link to={`/photo/${photo.id}`}>
                    <Card.Img
                      variant="top"
                      src={photo.photo_url}
                      alt={photo.title}
                      className="main"
                    />
                  </Link>
                  <Card.Body
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <span
                        onClick={() =>
                          localStorage.getItem("token") &&
                          favsID.includes(photo.id)
                            ? unLike(photo.id)
                            : addLike(photo.id)
                        }
                        style={{ display: "flex" }}
                      >
                        {favsID && favsID.includes(photo.id) ? (
                          <FaHeart
                            size="1.25em"
                            style={{
                              color: "crimson",
                              cursor: "pointer",
                              marginRight: "5px"
                            }}
                          />
                        ) : (
                          <FaRegHeart
                            size="1.25em"
                            style={{
                              color: "#999999",
                              cursor: "pointer",
                              marginRight: "5px"
                            }}
                          />
                        )}
                      </span>
                      <span
                        style={{
                          marginRight: "15px",
                          color: "gray",
                          fontSize: "12px"
                        }}
                      >
                        {photo.likes} likes
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link to={`/photo/${photo.id}`}>
                        <span
                          style={{
                            color: "gray",
                            fontSize: "12px"
                          }}
                        >
                          {photo.comments} comments
                        </span>
                      </Link>
                    </div>
                  </Card.Body>
                </Card>
              );
            })
            .reverse()}
        </div>
      </section>
    </div>
  );
}

export default Home;
