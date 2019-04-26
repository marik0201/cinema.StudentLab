import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import UserService from '../../Service/UserService.js';
import style from './style.scss';

export default class AdminUsersCard extends Component {
  state = {
    snackMessage: '',
    openSnack: false
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  deleteUser = () => {
    axios
      .delete(`http://localhost:3000/api/admin/users/${this.props.item._id}`, {
        headers: {
          Authorization: 'JWT ' + UserService.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        this.snack('Пользователь удален');
        this.props.getUsers();
      })
      .catch(err => {
        this.snack('Не удалось удалить');
      });
  };

  changeRole = () => {
    axios
      .post(
        `http://localhost:3000/api/admin/users/changerole/${
          this.props.item._id
        }`,
        {},
        {
          headers: {
            Authorization: 'JWT ' + UserService.getToken(),
            'Content-Type': 'application/json'
          }
        }
      )
      .then(() => {
        this.snack('Статус пользователя изменён');
        this.props.getUsers();
      })
      .catch(err => {
        this.snack('Не удалось изменить статус');
      });
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

  render() {
    const { isAdmin, name } = this.props.item;
    const { openSnack } = this.state;
    return (
      <div className="adminUsers__card">
        <div className="adminUser__name">
          <span>Пользователь: </span> <span>{name}</span>
        </div>
        <div className="adminUser__role">
          <span>Статус: </span>
          {isAdmin ? <span>Администратор</span> : <span>Пользователь</span>}
        </div>
        <Button variant="contained" onClick={this.changeRole}>
          {isAdmin ? (
            <span>Сделать пользователем</span>
          ) : (
            <span>Сделать админом</span>
          )}
        </Button>
        <Button variant="contained" onClick={this.deleteUser}>
          Удалить
        </Button>

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
