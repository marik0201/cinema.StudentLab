import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./style.scss";
import { slugify } from "transliteration";

export default class FilmCard extends Component {
  render() {
    return (
      <div className="card">
        <div
          className="img__container"
          style={{
            backgroundImage: `url(${this.props.item.url})`,
            backgroundSize: "cover"
          }}
        />

        <div>
          <h3>{this.props.item.name}</h3>
          <Button variant="contained">
            <Link to={`/${slugify(this.props.item.name)}`}> Заказать </Link>
          </Button>
        </div>
      </div>
    );
  }
}
