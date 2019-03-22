import React, { Component } from "react";
import FilmCard from "../FilmCard/FilmCard";
import axios from "axios";
import "./style.scss";

export default class Cinemas extends Component {
  state = {
    items: []
  };

  componentDidMount() {
    axios.get("http://localhost:3000/api/films").then(res => {
      this.setState({
        items: res.data.result
      });
    });
  }

  render() {
    return (
      <div className="cinemas__container">
        {this.state.items.map(item => (
          <FilmCard item={item} />
        ))}
      </div>
    );
  }
}
