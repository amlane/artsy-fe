import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { visitUser } from "../actions";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import Loader from "react-loader-spinner";
import jwt_decode from "jwt-decode";
import HomeHero from "./HomeHero";
import { axiosWithAuth } from "./Authentication/axiosWithAuth";

function Home(props) {
  const [photos, setPhotos] = useState(null);
  const [userFavorites, setUserFavorites] = useState(null);
  const [favsID, setFavsID] = useState(null);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const getUserData = () => {
    var token = localStorage.getItem("token");
    if (token) {
      var decoded = jwt_decode(token);
      axios
        .get(`https://artsy-be.herokuapp.com/api/users/${decoded.subject}`)
        .then(res => {
          setUserFavorites(res.data.user.favorites);
        })
        .catch(err => {
          console.log({ err });
        });
    }
  };

  useEffect(() => {
    getUserData();
    axios
      .get("https://artsy-be.herokuapp.com/api/photos")
      .then(res => {
        setPhotos(res.data.photos);
      })
      .catch(err => {
        console.log({ err });
      });
  }, []);

  useEffect(() => {
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
          setPhotos(res.data.photos);
          getUserData();
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
        setPhotos(res.data.photos);
        getUserData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  function connectToProfile(userId) {
    dispatch(visitUser(userId));
    visitPage(userId);
  }

  function visitPage(userId) {
    props.history.push(`/user/${userId}/posts`);
  }

  if (!photos)
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
  console.log(photos);
  return (
    <div className="home-page">
      <HomeHero />
      <section>
        <div className="photos">
          {photos
            .map(photo => {
              return (
                <Card
                  key={photo.id}
                  className="card"
                  style={{
                    margin: "10px",
                    border: "1px solid #E9ECEF"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      padding: "5% 5% 0 5%"
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
                      onClick={() => connectToProfile(photo.user_id)}
                    />
                    <p style={{ margin: "5px" }}>{photo.username}</p>
                  </div>
                  <Link to={`/photo/${photo.id}`}>
                    <Card.Img
                      variant="top"
                      src={photo.photo_url}
                      alt={photo.title}
                      style={{
                        height: "40vh",
                        objectFit: "cover",
                        objectPosition: "center",
                        padding: "5% 5% 0 5%"
                      }}
                    />
                  </Link>
                  <Card.Body
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "flex-start"
                    }}
                  >
                    <span
                      onClick={() =>
                        localStorage.getItem("token") &&
                        favsID.includes(photo.id)
                          ? unLike(photo.id)
                          : addLike(photo.id)
                      }
                    >
                      <i
                        className="fas fa-star"
                        style={{
                          color:
                            favsID && favsID.includes(photo.id)
                              ? "#D4AF43"
                              : "gray",
                          cursor: "pointer",
                          fontSize: "24px",
                          paddingRight: "5px"
                        }}
                      ></i>
                    </span>
                    <span>{photo.likes}</span>
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
