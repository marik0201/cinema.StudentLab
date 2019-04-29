import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import style from './style.scss';

export default class AdminUsersCard extends Component {
  handleClose = () => {
    this.setState({ open: false });
  };

  deleteUser = () => {
    this.props.onUserDelete(this.props.item._id);
  };

  changeRole = () => {
    this.props.onRoleChange(this.props.item._id);
  };

  render() {
    const { isAdmin, name } = this.props.item;
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
      </div>
    );
  }
}
