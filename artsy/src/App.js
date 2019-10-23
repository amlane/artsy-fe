import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from "react-router-dom";
import Login from './components/Login';
import UserDashboard from "./components/UserDashboard"

function App() {
  return (

    <div className="App">
      <header className="App-header">
        <p>Artsy</p>
      </header>
      <Route exact path="/" component={Login} />
      <Route path="/user" component={UserDashboard} />
    </div>
  );
}

export default App;
