import React, {Component} from 'react';
import SearchFilm from '../SearchFilm/SearchFilm';
import SearchCinema from '../SearchCinema/SearchCinema';
import SearchCity from '../SearchCity/SearchCity';

import "./style.scss";


export default class Filter extends Component {
    constructor(props) {
        super(props);
    }

     render() {
         return (
             <div className="filter__container">
                <div className="filter__card">
                <h3>Фильтры</h3>
                <SearchFilm/>
                <SearchCinema/>
                <SearchCity/>
                </div>
             </div>
         )
     }
 }
