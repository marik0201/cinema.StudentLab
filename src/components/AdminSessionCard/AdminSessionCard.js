import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/core/styles';

import UserService from '../../Service/UserService.js';
import './style.scss';

const styles = {
  root: {
    width: '80%',
    margin: '2% auto' 
  }
};

class AdminSessionCard extends Component {
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
    moment.locale('ru');
    return `${moment(this.props.item.time).format('llll')}`;
  };

  editSession = () => {
    const { cinema, time } = this.state;
    this.props.onSessionEdit(cinema,time, this.props.item._id);
    
  };

  deleteSession = () => {
    this.props.onSessionDelete(this.props.item._id)
  };

  render() {
    const { openSnack } = this.state;
    const { classes } = this.props;
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
          classes = {{ root: classes.root }}
          onClick={this.handleClickOpen}
        >
          Изменить сеанс
        </Button>
        <Button
          variant="contained"
          classes = {{ root: classes.root }}
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
              type="datetime-local"
              value={this.state.time}
              onChange={this.handleChange('time')}
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

export default withStyles(styles)(AdminSessionCard);