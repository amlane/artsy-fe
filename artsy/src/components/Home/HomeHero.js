import React from "react";
import { Jumbotron, Button, Nav } from "react-bootstrap";
import { IoMdCheckmark } from "react-icons/io";
// photos
import designer from "../../assets/designer.svg";
import camera from "../../assets/camera.svg";
import post_image from "../../assets/image_post.svg";

function HomeHero() {
  return (
    <>
      {!localStorage.getItem("token") ? (
        <Jumbotron className="home-hero">
          <h1>
            Are you <span>Artsy?</span>
          </h1>
          <div className="mobile-header">
            <h2>Artsy</h2>
            <div className="login">
              <Nav.Link href="/login">Login/SignUp</Nav.Link>
            </div>
          </div>
          <section className="container">
            <div className="artist">
              <img src={designer} alt="designer" />
              <h3>
                <IoMdCheckmark className="checkmark" /> Create
              </h3>
            </div>
            <div className="camera">
              <img src={camera} alt="camera" />
              <h3>
                <IoMdCheckmark className="checkmark" /> Photograph
              </h3>
            </div>
            <div className="share">
              <img src={post_image} alt="sharing a post" />
              <h3>
                <IoMdCheckmark className="checkmark" /> Share
              </h3>
            </div>
          </section>
          <div>
            <Button className="sign-up-btn" variant="outline" href="/register">
              Sign Up
            </Button>
            <Button className="sign-in-btn" variant="info" href="/login">
              Sign In
            </Button>
          </div>
        </Jumbotron>
      ) : null}
    </>
  );
}

export default HomeHero;
