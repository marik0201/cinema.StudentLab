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
import './style.scss';

const currencies = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  }
];

export default class SessionCard extends Component {
  state = {
    open: false,
    age: '',
    currency: 1,
    numberOfSeats: 1,
    name: '',
    errorMessage: '',
    openSnack: false,
    vertical: 'bottom',
    horizontal: 'center',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  orderTicket = () => {
    const ticket = {
      name: this.state.name,
      numberOfSeats: this.state.numberOfSeats,
      sessionId: this.props.item._id
    };

    axios
      .post('http://localhost:3000/api/ticket', { ticket })
      .then(res => {
        this.setState({ open: false,
        openSnack: true });
        setTimeout(() => {this.setState({
          openSnack:false
        })}, 2000);
      })
      .catch(() => {
        this.setState({
          errorMessage: 'Не удалось заказать билет'
        });
      });
  };

  changeSeats = () => {
    this.setState({
      numberOfSeats: value
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

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Заказать билет</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Выберите нужное количество мест (не более 5) и введите ваше имя,
              чтобы заказать билет на фильм {this.props.filmName}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Ваше имя"
              value={this.state.name}
              onChange={this.handleChange('name')}
              type="email"
              fullWidth
            />
            <TextField
              id="standard-select-currency"
              select
              value={this.state.numberOfSeats}
              onChange={this.handleChange('numberOfSeats')}
              helperText="Количество мест"
              margin="normal"
            >
              {currencies.map(option => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  onChange={this.changeSeats}
                >
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            {this.state.errorMessage ? (
              <span>{this.state.errorMessage}</span>
            ) : (
              <></>
            )}
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
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Билет заказан</span>}
        />
        
      </div>
    );
  }
}
