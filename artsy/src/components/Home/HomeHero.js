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
            <div
              style={{
                position: "absolute",
                top: "15px",
                right: "0",
                fontSize: "12px"
              }}
            >
              <Nav.Link style={{ color: "gray" }} href="/login">
                Login/SignUp
              </Nav.Link>
            </div>
          </div>
          <section className="container">
            <div className="artist">
              <img src={designer} alt="designer" />
              <h3>
                <IoMdCheckmark color="#F1651F" /> Create
              </h3>
            </div>
            <div className="camera">
              <img src={camera} alt="camera" />
              <h3>
                <IoMdCheckmark color="#F1651F" /> Photograph
              </h3>
            </div>
            <div className="share">
              <img src={post_image} alt="sharing a post" />
              <h3>
                <IoMdCheckmark color="#F1651F" /> Share
              </h3>
            </div>
          </section>
          <div>
            <Button
              style={{
                margin: "30px 20px 0 0",
                border: "2px solid #1C93B9",
                color: "#1C93B9",
                borderRadius: "25px",
                width: "120px"
              }}
              variant="outline"
              size="lg"
              href="/register"
            >
              Sign Up
            </Button>
            <Button
              style={{
                margin: "30px 0 0 0",
                backgroundColor: "#1C93B9",
                border: "2px solid #1C93B9",
                borderRadius: "25px",
                width: "120px"
              }}
              variant="info"
              size="lg"
              href="/login"
            >
              Sign In
            </Button>
          </div>
        </Jumbotron>
      ) : null}
    </>
  );
}

export default HomeHero;
