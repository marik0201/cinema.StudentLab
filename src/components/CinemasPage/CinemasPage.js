import React, {Component} from 'react';
import Filter from "../Filter/Filter";
import Cinemas from "../Cinemas/Cinemas"
import "./style.scss";

 const CinemasPage = () =>
 <div className="container__cinemasPage">
    <Filter/>
    <Cinemas/>
 </div>
 

export default CinemasPage
