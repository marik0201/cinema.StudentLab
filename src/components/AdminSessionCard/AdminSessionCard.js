import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';

import UserService from '../../Service/UserService.js';
import './style.scss';

export default class AdminSessionCard extends Component {
  state = {
    open: false,
    openSnack: false,
    cinema: this.props.item.cinema,
    time: new Date(this.props.item.time).toISOString().slice(0, 16),
    snackMessage: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  getDate = () => {
    const fullDate = new Date(this.props.item.time);
    const year = fullDate.getFullYear();
    const month = fullDate.getMonth();
    const date = fullDate.getDate();
    const hours = fullDate.getHours();
    const minutes = fullDate.getMinutes();
    return `${year}-${month}-${date} ${hours}:${minutes}`;
  };

  editSession = () => {
    const { cinema, time } = this.state;

    if (cinema && time) {
      axios
        .put(
          `http://localhost:3000/api/admin/sessions/${this.props.item._id}`,
          { time, cinema },
          {
            headers: {
              Authorization: 'JWT ' + UserService.getToken(),
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          this.props.snackbar('Сеанс изменен');
          this.setState({ open: false });
          this.props.getSessions();
        })
        .catch(err => {
          this.props.snackbar('Не удалось изменить');
        });
    } else {
      this.props.snackbar('Заполните поля');
    }
  };

  deleteSession = () => {
    axios
      .delete(
        `http://localhost:3000/api/admin/sessions/${this.props.item._id}`,
        {
          headers: {
            Authorization: 'JWT ' + UserService.getToken(),
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        this.props.snackbar('Сеанс удален');
        this.props.getSessions();
      })
      .catch(err => {
        this.props.snackbar('Не удалось удалить');
      });
  };

  render() {
    const { openSnack } = this.state;
    return (
      <div className="session__card">
        <div className="session__info">
          <span>Время: </span>
          {this.getDate()}
        </div>
        <div className="session__info">
          <span>Кинотеатр: </span>
          {this.props.item.cinema}
        </div>
        <div className="session__info">
          <span>Свободных мест: </span>
          {this.props.item.emptySeats}
        </div>
        <Button
          variant="contained"
          className="sessionCard__button"
          onClick={this.handleClickOpen}
        >
          Изменить сеанс
        </Button>
        <Button
          variant="contained"
          className="sessionCard__button"
          onClick={this.deleteSession}
        >
          Удалить сеанс
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Изменить сеанс</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Заполните поля для изменения сеанса
            </DialogContentText>
            <TextField
              id="name"
              label="Название кинотетра"
              type="search"
              margin="normal"
              value={this.state.cinema}
              onChange={this.handleChange('cinema')}
              fullWidth
            />
            <TextField
              id="datetime-local"
              label="Next appointment"
              type="datetime-local"
              defaultValue={this.state.time}
              onChange={this.handleChange('time')}
              InputLabelProps={{
                shrink: true
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Отмена
            </Button>
            <Button color="primary" onClick={this.editSession}>
              Изменить
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={openSnack}
          onClose={this.handleClose}
          message={<span>{this.state.snackMessage}</span>}
        />
      </div>
    );
  }
}
