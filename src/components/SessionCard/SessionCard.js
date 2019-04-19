import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import history from '../../history';
import UserService from '../../Service/UserService.js';
import './style.scss';

const numberOfSeats = [1, 2, 3, 4, 5];

export default class SessionCard extends Component {
  state = {
    open: false,
    openSnack: false,
    age: '',
    currency: 1,
    selectedSeats: 1,
    name: '',
    snackMessage: '',
    vertical: 'bottom',
    horizontal: 'center'
  };

  handleClickOpen = () => {
    const isLoggedIn = UserService.isLoggedIn();
    isLoggedIn ? this.setState({ open: true }) : history.push('/auth');
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  orderTicket = () => {
    const ticket = {
      numberOfSeats: this.state.selectedSeats,
      sessionId: this.props.item._id
    };

    axios
    .post(
      'http://localhost:3000/api/tickets',
      { ticket },
      {
        headers: {
          Authorization: 'JWT ' + UserService.getToken(),
          'Content-Type': 'application/json'
        }
      }
    )
      .then(res => {
        this.setState({
          snackMessage: 'Билет заказан',
          open: false,
          openSnack: true,
          name: ''
        });

        setTimeout(
          () =>
            this.setState({
              openSnack: false
            }),
          3000
        );
      })
      .catch((err) => {
        this.setState({
          snackMessage: 'Не удалось заказать',
          open: false,
          openSnack: true
        });
        setTimeout(
          () =>
            this.setState({
              openSnack: false
            }),
          3000
        );
      });
  };

  changeSelectedSeats = () => {
    this.setState({
      selectedSeats: value
    });
  };

  render() {
    const { vertical, horizontal, openSnack } = this.state;
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
        <Button variant="contained" onClick={this.handleClickOpen}>
          Заказать билет
        </Button>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Заказать билет</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Выберите нужное количество мест (не более 5),
              чтобы заказать билет на фильм {this.props.filmName}
            </DialogContentText>
            <TextField
              id="standard-select-currency"
              select
              value={this.state.selectedSeats}
              onChange={this.handleChange('selectedSeats')}
              helperText="Количество мест"
              margin="normal"
            >
              {numberOfSeats.map(option => (
                <MenuItem
                  key={option}
                  value={option}
                  onChange={this.changeSelectedSeats}
                >
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Отмена
            </Button>
            <Button onClick={this.orderTicket} color="primary">
              Заказать
            </Button>
          </DialogActions>
        </Dialog>
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
