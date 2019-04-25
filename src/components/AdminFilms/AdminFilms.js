import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import AdminFilmCard from '../AdminFilmCard/AdminFilmCard';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import UserService from '../../Service/UserService.js';
import style from './style.scss';

export default class AdminFilms extends Component {
  state = {
    films: [],
    snackMessage: '',
    openSnack: false,
    open: false,
    name: '',
    url: ''
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

  addFilm = () => {
    const { name, url } = this.state;
    axios
      .post(
        `http://localhost:3000/api/admin/films`,
        { name, url },
        {
          headers: {
            Authorization: 'JWT ' + UserService.getToken(),
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        this.snack('Фильм добавлен');
        this.setState({ open: false });
      })
      .catch(err => {
        this.snack('Не удалось добавить');
        this.setState({ open: false });
      });
  };

  componentDidMount() {
    axios
      .get('http://localhost:3000/api/films')
      .then(res => {
        this.setState({
          films: res.data.result
        });
      })
      .catch(() => {
        this.setState({
          errorMessage: 'Ошибка сервера'
        });
      });
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
    return (
      <div className="adminFilms__container">
        <div className="filmsList">
          <Fab
            color="primary"
            className="addFilm__button"
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Fab>
          {this.state.films.map(item => (
            <AdminFilmCard item={item} snackbar={this.snack} key={item._id} />
          ))}
        </div>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>Добавить фильм</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Заполните поля для добавления фильма
            </DialogContentText>
            <TextField
              id="name"
              label="Название фильма"
              type="search"
              margin="normal"
              value={this.state.name}
              onChange={this.handleChange('name')}
              fullWidth
            />
            <TextField
              id="url"
              label="Ссылка на фото"
              type="search"
              margin="normal"
              value={this.state.url}
              onChange={this.handleChange('url')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Отмена
            </Button>
            <Button color="primary" onClick={this.addFilm}>
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
