import React from "react";

import "./App.css";

import { Route } from "react-router-dom";
import PrivateRoute from "./components/utils/PrivateRoute";

import Login from "./components/Authentication/Login";
import Register from "./components/Authentication/Register";
import Home from "./components/Home/Home";
import Navigation from "./components/Home/NavBar";
import MobileNav from "./components/Home/MobileNav";
import NewPost from "./components/Forms/NewPost";
import EditPost from "./components/Forms/EditPost";
import EditProfile from "./components/Forms/EditProfile";
import SinglePostView from "./components/SinglePostView/SinglePostView";
import Search from "./components/Home/Search";
import Dashboard from "./components/Portfolio/Dashboard";
import Photos from "./components/Portfolio/Photos";
import Favorites from "./components/Portfolio/Favorites";
import GalleryInfo from "./components/Portfolio/GalleryInfo";
import ExploreUsers from "./components/Home/ExploreUsers";
import UserSettings from "./components/Forms/UserSettings";

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
      <Route path="/portfolio/:id" component={Dashboard} />
      <Route path="/portfolio/:id/posts" component={Photos} />
      <Route path="/portfolio/:id/favorites" component={Favorites} />
      <Route path="/portfolio/:id/info" component={GalleryInfo} />
      <PrivateRoute exact path="/connect" component={ExploreUsers} />
      <PrivateRoute path="/settings/:id" component={UserSettings} />
      <PrivateRoute path="/new-post" component={NewPost} />
      <PrivateRoute path="/edit-post/:id" component={EditPost} />
      <PrivateRoute path="/edit-profile" component={EditProfile} />
    </div>
  );
}

export default App;
