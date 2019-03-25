import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import Cinemas from "../Cinemas/Cinemas";
import Session from "../Session/Session";
import "./style.scss";

const CinemasPage = () => (
  <div className="container__cinemasPage">
  <Switch>
    <Route exact path="/" component={Cinemas}/>
    <Route path ="/:film" component={Session}/>
  </Switch>
  </div>
);

export default CinemasPage;
