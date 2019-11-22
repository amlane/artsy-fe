import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./actions";

import "./App.css";

import { Route } from "react-router-dom";
import PrivateRoute from "./components/Authentication/PrivateRoute";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import UserDashboard from "./components/UserDashboard";
import Navigation from "./components/NavBar";
import MobileNav from "./components/MobileNav";
import NewPost from "./components/NewPost";
import EditProfile from "./components/EditProfile";
import MyPhotos from "./components/MyPhotos";
import MyFavorites from "./components/MyFavorites";
import SinglePostView from "./components/SinglePostView";
import Search from "./components/Search";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    var token = localStorage.getItem("token");
    if (token) {
      dispatch(getUser());
    }
  }, [dispatch]);

  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <MobileNav />
      </header>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/photo/:photoId" component={SinglePostView} />
      <Route exact path="/search/:title" component={Search} />
      <PrivateRoute path="/user/:id" component={UserDashboard} />
      <PrivateRoute exact path="/user/:id/posts" component={MyPhotos} />
      <PrivateRoute exact path="/user/:id/favorites" component={MyFavorites} />
      <PrivateRoute path="/new-post" component={NewPost} />
      <PrivateRoute path="/edit-profile" component={EditProfile} />
    </div>
  );
}

export default App;
