import React, {Component} from 'react';
import FilmCard from "../FilmCard/FilmCard";
import "./style.scss";

 export default class Cinemas extends Component {
     render() {
         return (
             <div className="cinemas__container">
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
                <FilmCard/>
             </div>
         )
     }
 }