import React from 'react';

import './App.css';

import { Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute"

import Login from './components/Login';
import UserDashboard from "./components/UserDashboard"
import NavBar from "./components/NavBar"

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <Route exact path="/" component={Login} />
      <PrivateRoute path="/user" component={UserDashboard} />
    </div>
  );
}

export default App;
