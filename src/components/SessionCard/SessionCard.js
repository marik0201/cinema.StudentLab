import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './style.scss';

export default class SessionCard extends Component {
  render() {
    return (
      <div className="session__card">
        <div className="session__info">
          <span>Время: </span>
          {this.props.item.time}
        </div>
        <div className="session__info">
          <span>Кинотеатр: </span>
          {this.props.item.cinema}
        </div>
        <div className="session__info">
          <span>Свободных мест: </span>
          {this.props.item.emptySeats}
        </div>
        <Button variant="contained">Заказать билет</Button>
      </div>
    );
  }
}
