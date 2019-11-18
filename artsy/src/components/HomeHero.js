import React from "react";
import { Jumbotron, Button } from 'react-bootstrap';
// photos
import designer from "../assets/designer.svg"
import camera from "../assets/camera.svg";
import post_image from "../assets/image_post.svg";

function HomeHero() {
    return (
        <>
            {!localStorage.getItem("token") ? (
                <Jumbotron className="home-hero">
                    <h1>Are you <span>Artsy?</span></h1>
                    <section className="container">
                        <div>
                            <img
                                src={designer}
                                alt="designer"
                            />
                            <h3 style={{ marginTop: '20px' }}>Create your art</h3>
                        </div>
                        <div>
                            <img
                                src={camera}
                                alt="camera"
                            />
                            <h3 style={{ marginTop: '20px' }}>Snap a photo</h3>
                        </div>
                        <div>
                            <img
                                src={post_image}
                                alt="sharing a post"
                            />
                            <h3 style={{ marginTop: '20px' }}>Share with the world</h3>
                        </div>
                    </section>
                    <Button style={{ marginTop: '30px', backgroundColor: '#1C93B9' }} variant="info" size="lg" href="/register">Get Started</Button>
                </Jumbotron>
            ) : null}
        </>
    )
}

export default HomeHero;