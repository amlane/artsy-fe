import React from 'react';
import { Link } from "react-router-dom"

function NavBar() {
    return (
        <nav>
            <h1>Artsy</h1>
            <div>
                <input type="search" />
                <button>search</button>
            </div>
            <Link to="/register">Register</Link>
            <Link to="/signin">Sign in</Link>
        </nav>
    );
}

export default NavBar;
