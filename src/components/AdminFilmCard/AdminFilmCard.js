import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import UserService from '../../Service/UserService.js';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import style from './style.scss';

export default class AdminFilmCard extends Component {
  state = {
    open: false,
    openSnack: false,
    name: this.props.item.name,
    url: this.props.item.url,
    snackMessage: ''
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

  editFilm = () => {
    const { name, url } = this.state;
    if (name && url) {
      axios
        .put(
          `http://localhost:3000/api/admin/films/${this.props.item._id}`,
          { name, url },
          {
            headers: {
              Authorization: 'JWT ' + UserService.getToken(),
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          this.props.snackbar('Фильм изменен');
          this.setState({ open: false });
        })
        .catch(err => {
          this.props.snackbar('Не удалось изменить');
        });
    } else {
      this.props.snackbar('Заполните поля');
    }
  };

  deleteFilm = () => {
    axios
      .delete(`http://localhost:3000/api/admin/films/${this.props.item._id}`, {
        headers: {
          Authorization: 'JWT ' + UserService.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        this.props.snackbar('Фильм удален');
      })
      .catch(err => {
        this.props.snackbar('Не удалось удалить');
      });
  };

  render() {
    return (
      <>
        <div className="card">
          <div
            className="img__container"
            style={{
              backgroundImage: `url(${this.props.item.url})`,
              backgroundSize: 'cover'
            }}
          />

          <div>
            <h3>{this.props.item.name}</h3>

            <Button variant="contained" onClick={this.handleClickOpen} className='filmCard__button'>
              Изменить
            </Button>
            <Button variant="contained" onClick={this.deleteFilm} className='filmCard__button'>
              Удалить
            </Button>
          </div>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Изменить фильм</DialogTitle>
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
              <Button color="primary" onClick={this.editFilm}>
                Изменить
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </>
    );
  }
}
