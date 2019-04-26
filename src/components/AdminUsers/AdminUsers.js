import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import UserService from '../../Service/UserService.js';
import AdminUsersCard from '../AdminUsersCard/AdminUsersCard';
import style from './style.scss';

export default class AdminUsers extends Component {
  state = {
    users: []
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

  componentDidMount = () => {
    this.getUsers();
  };

  render() {
    return (
      <div>
        <div className="userCard__container">
          {this.state.users.map(item => (
            <AdminUsersCard
              item={item}
              getUsers={this.getUsers}
              key={item._id}
            />
          ))}
        </div>
      </div>
    );
  }
}
