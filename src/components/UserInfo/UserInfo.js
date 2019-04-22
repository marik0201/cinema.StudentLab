import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import history from '../../history';
import UserService from '../../Service/UserService.js';
import style from './style.scss';

export default class UserInfo extends Component {
  state = {
    newName: '',
    snackMessage: '',
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

  changeInfo = () => {
    const { newName } = this.state;
    if (!newName) {
      this.snack('Заполните поле');
    } else {
      axios
        .put(
          'http://localhost:3000/api/user',
          { newName },
          {
            headers: {
              Authorization: 'JWT ' + UserService.getToken(),
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          this.snack('Имя изменено');
          UserService.setNewName(newName);
        })
        .catch(err => {
          err.response.status === 401
            ? history.push('/auth')
            : this.snack('Не удалось изменить имя');
        });
    }
  };

  changePassword = () => {
    const { oldPassword, newPassword } = this.state;

    if (!oldPassword || !newPassword) {
      this.snack('Заполните поля');
    } else {
      axios
        .post(
          'http://localhost:3000/api/auth/changepassword',
          { oldPassword, newPassword },
          {
            headers: {
              Authorization: 'JWT ' + UserService.getToken(),
              'Content-Type': 'application/json'
            }
          }
        )
        .then(() => {
          this.snack('Пароль изменен');
        })
        .catch(err => {
          err.response.status === 401
            ? history.push('/auth')
            : this.snack(err.response.data.message);
        });
    }
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { openSnack } = this.state;
    return (
      <div className="userInfo__container">
        <div className="userInfo__card">
          <h3>Изменить данные: </h3>
          <TextField
            id="login"
            label="Введите новое имя"
            type="search"
            margin="normal"
            onChange={this.handleChange('newName')}
            fullWidth
          />

          <Button
            variant="contained"
            className="userInfo__button"
            onClick={this.changeInfo}
          >
            Изменить данные
          </Button>
          <h3>Сменить пароль: </h3>
          <TextField
            id="oldPassword"
            label="Введите старый пароль"
            type="password"
            margin="normal"
            onChange={this.handleChange('oldPassword')}
            fullWidth
          />

          <TextField
            id="newPassword"
            label="Введите новый пароль"
            type="password"
            margin="normal"
            onChange={this.handleChange('newPassword')}
            fullWidth
          />

          <Button
            variant="contained"
            className="userInfo__button"
            onClick={this.changePassword}
          >
            Изменить пароль
          </Button>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center',}}
          open={openSnack}
          onClose={this.handleClose}
          message={<span>{this.state.snackMessage}</span>}
        />
      </div>
    );
  }
}
