import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setFavsID } from "../../actions";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
import Loader from "react-loader-spinner";
import HomeHero from "./HomeHero";
import { axiosWithAuth } from "../utils/axiosWithAuth";

function Home(props) {
  const userFavorites = useSelector(state => state.userFavorites);
  const favsID = useSelector(state => state.favsID);
  const dispatch = useDispatch();

  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    dispatch(getUser());
    axios
      .get("https://artsy-be.herokuapp.com/api/photos")
      .then(res => {
        setPhotos(res.data.photos);
      })
      .catch(err => {
        console.log({ err });
      });
  }, [dispatch]);

  useEffect(() => {
    console.log("check home");
    dispatch(setFavsID());
  }, [userFavorites, dispatch]);

  const addLike = id => {
    if (!localStorage.getItem("token")) {
      props.history.push("/login");
    } else {
      axiosWithAuth()
        .post(`https://artsy-be.herokuapp.com/api/photos/${id}/like`)
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
      .delete(`https://artsy-be.herokuapp.com/api/photos/${id}/unlike`)
      .then(res => {
        setPhotos(res.data.photos);
        dispatch(getUser());
      })
      .catch(err => {
        console.log(err);
      });
  };
  console.log(userFavorites);
  console.log(favsID);
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
                    to={`/portfolio/${photo.user_id}`}
                    style={{
                      display: "flex",
                      padding: "5% 5% 0 5%",
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
                      style={{
                        height: "50vh",
                        maxHeight: "400px",
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