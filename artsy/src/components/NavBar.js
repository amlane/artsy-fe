import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import "../index.css"

function Navigation(props) {

    const logout = () => {
        localStorage.removeItem("token");
        props.history.push("/")
    }

    return (
        <Navbar variant="light" style={{ backgroundColor: "#E9ECEF" }}>
            <Navbar.Brand style={{ fontFamily: 'Megrim, cursive', fontSize: '64px', margin: '0 3% 0 3%' }}><Link to="/">Artsy</Link></Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/user/posts">Dashboard</Nav.Link>
                <Nav.Link href="/">Discover</Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info" style={{}}>Search</Button>
            </Form>
            <Nav style={{ margin: '0 3% 0 3%' }}>
                {localStorage.getItem("token") ? (
                    <Nav.Link onClick={logout}>Log out</Nav.Link>
                ) : (
                        <Nav.Link href="/login">Login/SignUp</Nav.Link>
                    )}
            </Nav>
        </Navbar >
    )
}

export default withRouter(Navigation);