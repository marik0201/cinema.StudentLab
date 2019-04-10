import React, { Component } from 'react';
import axios from 'axios';
import history from '../../history';
import style from './style.scss';

export default class UserPage extends Component {
  componentWillMount = () => {
    const token = localStorage.getItem('token');
    axios
      .get('http://localhost:3000/api/auth', {
        headers: {
          Authorization: 'JWT ' + token,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        history.push('/');
      });
  };
  render() {
    return <h1>UserPage</h1>;
  }
}
