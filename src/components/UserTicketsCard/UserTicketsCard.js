import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import UserService from '../../Service/UserService.js';
import style from './style.scss';

export default class UserTickets extends Component {
  state = {
    snackMessage: '',
    vertical: 'bottom',
    horizontal: 'center',
    openSnack: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  snack = message => {
    this.setState({
      snackMessage: message,
      openSnack: true
    });

    setTimeout(
      () =>
        this.setState({
          openSnack: false
        }),
      3000
    );
  };

  cancelTicket = () => {
    axios
      .post(
        `http://localhost:3000/api/tickets/${this.props.item._id}/cancel`,
        {},
        {
          headers: {
            Authorization: 'JWT ' + UserService.getToken(),
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        this.snack('Билет отменён');
      })
      .catch(err => {
        this.snack('Не удалось отменить билет');
      });
  };

  render() {
    const {
      status,
      sessionId: {
        time,
        filmId: { name }
      }
    } = this.props.item;
    const { vertical, horizontal, openSnack } = this.state;
    return (
      <div className="userTicketsCard__container">
        <div className="filmName">
          <span>Фильм: </span> <span>{name}</span>
        </div>
        <div className="filmData">
          <span>Дата: </span> <span>{time}</span>
        </div>
        <div className="statusFilm">
          <span>Статус: </span> <span>{status}</span>
        </div>
        {status !== 'Canceled' ? (
          <Button variant="contained" onClick={this.cancelTicket}>
            Отменить
          </Button>
        ) : (
          <></>
        )}
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={openSnack}
          onClose={this.handleClose}
          message={<span>{this.state.snackMessage}</span>}
        />
      </div>
    );
  }
}