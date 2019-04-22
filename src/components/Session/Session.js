import React, { Component } from 'react';
import axios from 'axios';
import SessionCard from '../SessionCard/SessionCard';
import './style.scss';

export default class Session extends Component {
  state = {
    filmSlugName: this.props.match.params.film,
    sessions: [],
    filmName: '',
    errorMessage: ''
  };

  componentWillMount() {
    axios
      .get(`http://localhost:3000/api/sessions/${this.state.filmSlugName}`)
      .then(res => {
        this.setState({
          sessions: res.data.result,
          filmName: res.data.filmName
        });
      })
      .catch(res => {
        this.setState({
          errorMessage: 'Ошибка сервера'
        });
      });
  }

  render() {
    return (
      <>
        <h2>Фильм: {this.state.filmName}</h2>
        {this.state.errorMessage ? <h2>{this.state.errorMessage}</h2> : <></>}
        <div className="container__cinemasPage">
          {this.state.sessions.map(item => (
            <SessionCard
              item={item}
              filmName={this.state.filmName}
              key={item._id}
            />
          ))}
        </div>
      </>
    );
  }
}
