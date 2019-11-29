import React from "react";

import "./App.css";

import { Route } from "react-router-dom";
import PrivateRoute from "./components/utils/PrivateRoute";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Home from "./components/Home/Home";
import UserDashboard from "./components/PrivateDashboard/UserDashboard";
import Navigation from "./components/Home/NavBar";
import MobileNav from "./components/Home/MobileNav";
import NewPost from "./components/PrivateDashboard/NewPost";
import EditPost from "./components/PrivateDashboard/EditPost";
import EditProfile from "./components/PrivateDashboard/EditProfile";
import MyPhotos from "./components/PrivateDashboard/MyPhotos";
import MyFavorites from "./components/PrivateDashboard/MyFavorites";
import SinglePostView from "./components/Portfolio/SinglePostView";
import Search from "./components/Home/Search";
import FriendDashboard from "./components/Portfolio/FriendDashboard";
import FriendPhotos from "./components/Portfolio/FriendPhotos";
import ExploreUsers from "./components/Home/ExploreUsers";
import UserSettings from "./components/PrivateDashboard/UserSettings";

function App() {
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
      <Route path="/portfolio/:id" component={FriendDashboard} />
      <Route path="/portfolio/:id" component={FriendPhotos} />
      <PrivateRoute exact path="/connect" component={ExploreUsers} />
      <PrivateRoute path="/user/:id" component={UserDashboard} />
      <PrivateRoute path="/settings/:id" component={UserSettings} />
      <PrivateRoute exact path="/user/:id/posts" component={MyPhotos} />
      <PrivateRoute exact path="/user/:id/favorites" component={MyFavorites} />
      <PrivateRoute path="/new-post" component={NewPost} />
      <PrivateRoute path="/edit-post/:id" component={EditPost} />
      <PrivateRoute path="/edit-profile" component={EditProfile} />
    </div>
  );
}

export default App;
