import React, { Component } from "react";
import SessionCard from "../SessionCard/SessionCard";
import axios from "axios";
import "./style.scss";

export default class Session extends Component {
  state = {
    sessionName: this.props.match.params.film,
    sessions: [],
    filmName: ""
  };

  componentDidMount() {
    axios
      .get(`http://localhost:3000/api/sessions/${this.state.sessionName}`)
      .then(res => {
        this.setState({
          sessions: res.data.result,
          filmName: res.data.filmName
        });
      });
  }

  render() {
    return (
      <>
        <h2>Фильм: {this.state.filmName}</h2>

        <div className="container__cinemasPage">
          {this.state.sessions.map(item => (
            <SessionCard item={item} />
          ))}
        </div>
      </>
    );
  }
}
