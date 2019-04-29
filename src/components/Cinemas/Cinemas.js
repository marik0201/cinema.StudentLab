import React, { Component } from 'react';
import axios from 'axios';

import FilmCard from '../FilmCard/FilmCard';
import './style.scss';

export default class Cinemas extends Component {
  state = {
    items: [],
    errorMessage: ''
  };

  componentDidMount() {
    axios.get('http://localhost:3000/api/films').then(res => {
      this.setState({
        items: res.data.result
      });      
    }).catch( () => {
      this.setState({
        errorMessage: 'Ошибка сервера'
      })
    });
  }

  render() {
    return (
      <div className="cinemas__container">
      {this.state.errorMessage ? (<h2>{this.state.errorMessage}</h2>) : <></>}
        {this.state.items.map(item => (
          <FilmCard item={item} key={item._id} />
        ))}
      </div>
    );
  }
}
