import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import "./style.scss";

 export default class Filter extends Component {
     render() {
         return (
             <div className="filter__container">
                <div className="filter__card">
                <h3>Фильтры</h3>
                <TextField
                    id="standard-search"
                    label="Search field"
                    type="search"
                    margin="normal"
                />
                </div>
             </div>
         )
     }
 }