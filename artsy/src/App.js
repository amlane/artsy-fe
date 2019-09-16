import React from 'react';
import { Route } from "react-router-dom"
import SignIn from "./components/SignIn"
import Register from "./components/Register"
import NavBar from "./components/NavBar"
import Dashboard from "./components/Dashboard"


function App() {
  return (
    <div className="App">
      <NavBar />
      <Route path="/register" component={Register} />
      <Route path="/signin" component={SignIn} />
      <Route path="/dashboard" component={Dashboard} />
    </div>
  );
}

export default App;
