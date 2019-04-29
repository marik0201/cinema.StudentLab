import React, { Component } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

import AdminSessionCard from '../AdminSessionCard/AdminSessionCard';
import UserService from '../../Service/UserService.js';
import style from './style.scss';

const filmNames = [];
const styles = {
  root: {
    background: '#eb1c23',
    position: 'absolute',
    left: '10px'
  }
};

class AdminSessions extends Component {
  state = {
    sessions: [],
    snackMessage: '',
    openSnack: false,
    open: false,
    cinema: '',
    films: [],
    film: '',
    numberOfSeats: 50,
    time: new Date().toISOString().slice(0, 16)
  };

  getFilmsNames = () => {
    axios
      .get('http://localhost:3000/api/films')
      .then(res => {
        this.state.films = res.data.result;
        for (const key of this.state.films) {
          filmNames.push({ name: key.name, id: key._id });
        }
      })
      .catch(() => {
        this.setState({
          errorMessage: 'Ошибка сервера'
        });
      });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  addSession = () => {
    const { film, cinema, time } = this.state;
    const emptySeats = this.state.numberOfSeats;
    let filmId = 0;
    for (const key of filmNames) {
      if (key.name === film) {
        filmId = key.id;
        break;
      }
    }

    axios
      .post(
        `http://localhost:3000/api/admin/sessions`,
        { time, cinema, emptySeats, filmId },
        {
          headers: {
            Authorization: 'JWT ' + UserService.getToken(),
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        this.snack('Сеанс добавлен');
        this.getSessions();
        this.setState({ open: false });
      })
      .catch(err => {
        this.snack('Не удалось добавить');
        this.setState({ open: false });
      });
  };

  onSessionEdit = (cinema, time, sessionId) => {
    if (cinema && time) {
      axios
        .put(
          `http://localhost:3000/api/admin/sessions/${sessionId}`,
          { time, cinema },
          {
            headers: {
              Authorization: 'JWT ' + UserService.getToken(),
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          this.snack('Сеанс изменен');
          this.setState({ open: false });
          this.getSessions();
        })
        .catch(err => {
          this.snack('Не удалось изменить');
        });
    } else {
      this.snack('Заполните поля');
    }
  };

  onSessionDelete = sessionId => {
    axios
      .delete(`http://localhost:3000/api/admin/sessions/${sessionId}`, {
        headers: {
          Authorization: 'JWT ' + UserService.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        this.snack('Сеанс удален');
        this.getSessions();
      })
      .catch(err => {
        this.snack('Не удалось удалить');
      });
  };

  getSessions = () => {
    axios
      .get('http://localhost:3000/api/admin/sessions', {
        headers: {
          Authorization: 'JWT ' + UserService.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({
          sessions: res.data.sessions
        });
      })
      .catch(() => {
        this.setState({
          open: false,
          errorMessage: 'Ошибка сервера'
        });
      });
  };
  componentDidMount() {
    this.getSessions();
    this.getFilmsNames();
  }

  snack = message => {
    this.setState({ snackMessage: message, openSnack: true });
    setTimeout(
      () =>
        this.setState({
          openSnack: false
        }),
      3000
    );
  };

  render() {
    const { openSnack } = this.state;
    const { classes } = this.props;
    return (
      <div className="adminSessions__container">
        <div className="sessionsList">
          <Fab
            color="primary"
            classes={{ root: classes.root }}
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Fab>
          {this.state.sessions.map(item => (
            <AdminSessionCard
              item={item}
              snackbar={this.snack}
              onSessionEdit={this.onSessionEdit}
              onSessionDelete={this.onSessionDelete}
              key={item._id}
            />
          ))}
        </div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Добавить фильм</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Заполните поля для добавления фильма
            </DialogContentText>
            <TextField
              id="standard-select-currency"
              select
              value={this.state.film}
              onChange={this.handleChange('film')}
              helperText="Выберите фильм"
              margin="normal"
            >
              {filmNames.map(option => (
                <MenuItem
                  key={option.id}
                  value={option.name}
                  onChange={this.handleChange('film')}
                >
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="name"
              label="Название кинотеатра"
              type="search"
              margin="normal"
              value={this.state.cinema}
              onChange={this.handleChange('cinema')}
              fullWidth
            />
            <TextField
              id="name"
              label="Количество мест"
              type="number"
              margin="normal"
              value={this.state.numberOfSeats}
              onChange={this.handleChange('numberOfSeats')}
              fullWidth
            />
            <TextField
              id="datetime-local"
              label="Дата сеанса"
              type="datetime-local"
              defaultValue={this.state.time}
              onChange={this.handleChange('time')}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Отмена
            </Button>
            <Button color="primary" onClick={this.addSession}>
              Добавить
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

export default withStyles(styles)(AdminSessions);
