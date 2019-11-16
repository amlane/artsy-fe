import React from 'react';

import './App.css';

import { Route } from "react-router-dom";
import PrivateRoute from "./components/Authentication/PrivateRoute"

import Login from './components/Login';
import Register from './components/Register';
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import Navigation from "./components/NavBar";
import EditProfile from "./components/EditProfile";

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <PrivateRoute path="/user" component={UserDashboard} />
      <PrivateRoute path="/edit-profile" component={EditProfile} />
    </div>
  );
}

export default App;
