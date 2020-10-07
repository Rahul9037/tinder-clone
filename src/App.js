import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/SignUp/SignUp";
import SwipeButtons from "./components/SwipeButtons/SwipeButtons";
import TinderCards from "./components/TinderCards/TinderCards";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  Redirect,
} from "react-router-dom";
import { useStateValue } from "./StateProvider/StateProvider";
import axios from './Axios/axios';

function App() {

  const [{ user }, dispatch] = useStateValue();

  useEffect( () => {
    async function fetchSessionData() {
      const req = await axios.get("/sessionChecker");
      console.log("req:",req.data);
      dispatch({
        type: "SET_USER",
        user: req.data,
      });
    }
    fetchSessionData();
  },[]);


  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            {!user ? <Login /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/home">
            {!user ? <Redirect to="/" /> : (<><TinderCards/><SwipeButtons/></>)}
          </Route>
          <Route exact path="/signup">
            {!user ? <SignUp /> : <Redirect to="/home" />}
          </Route>
          <Route exact path="/profile">
          {!user ? <Redirect to="/" /> : <Profile/>}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
