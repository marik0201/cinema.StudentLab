import React, { Component } from 'react';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';

import UserService from '../../Service/UserService.js';
import AdminUsersCard from '../AdminUsersCard/AdminUsersCard';
import style from './style.scss';

export default class AdminUsers extends Component {
  state = {
    users: [],
    snackMessage: '',
    openSnack: false
  };

  getUsers = () => {
    axios
      .get('http://localhost:3000/api/admin/users', {
        headers: {
          Authorization: 'JWT ' + UserService.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({
          users: res.data.users
        });
      });
  };

  onUserDelete = userId => {
    axios
      .delete(`http://localhost:3000/api/admin/users/${userId}`, {
        headers: {
          Authorization: 'JWT ' + UserService.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(() => {
        this.snack('Пользователь удален');
        this.getUsers();
      })
      .catch(err => {
        this.snack('Не удалось удалить');
      });
  };

  onRoleChange = userId => {
    axios
      .post(
        `http://localhost:3000/api/admin/users/changerole/${userId}`,
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
        this.getUsers();
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

  componentDidMount = () => {
    this.getUsers();
  };

  render() {
    const { openSnack } = this.state;

    return (
      <div>
        <div className="userCard__container">
          {this.state.users.map(item => (
            <AdminUsersCard
              item={item}
              onRoleChange={this.onRoleChange}
              onUserDelete={this.onUserDelete}
              key={item._id}
            />
          ))}
        </div>

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
