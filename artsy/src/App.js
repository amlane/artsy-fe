import React from 'react';

import './App.css';

import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"

import Login from './components/Login';
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard"
import Navigation from "./components/NavBar"

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute path="/user" component={UserDashboard} />
    </div>
  );
}

export default App;
