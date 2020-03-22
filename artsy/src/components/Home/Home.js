import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser, setFavsID } from "../../actions";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";
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
                    className="intro"
                  >
                    <Image
                      roundedCircle
                      src={photo.avatar_url}
                      alt={photo.username}
                      className="profile"
                    />
                    <p>{photo.username}</p>
                  </Link>
                  <Link to={`/photo/${photo.id}`}>
                    <Card.Img
                      variant="top"
                      src={photo.photo_url}
                      alt={photo.title}
                      className="main"
                    />
                  </Link>
                  <Card.Body className="footer">
                    <div className="likes">
                      <span
                        onClick={() =>
                          localStorage.getItem("token") &&
                          favsID.includes(photo.id)
                            ? unLike(photo.id)
                            : addLike(photo.id)
                        }
                      >
                        {favsID && favsID.includes(photo.id) ? (
                          <FaHeart size="1.25em" className="red-heart" />
                        ) : (
                          <FaRegHeart size="1.25em" className="heart-outline" />
                        )}
                      </span>
                      <span className="text">{photo.likes} likes</span>
                    </div>
                    <Link to={`/photo/${photo.id}`} className="comments">
                      {photo.comments > 0 ? (
                        <span>{photo.comments} comments</span>
                      ) : null}
                    </Link>
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
