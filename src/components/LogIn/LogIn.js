import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import UserService from '../../Service/UserService.js';
import { logIn } from '../../actions/user'

class LogIn extends Component {
  state = {
    login: '',
    password: ''
  };

  loginSubmit = () => {
    const { login, password } = this.state;

    login && password
      ? 
      // axios
          // .post('http://localhost:3000/api/auth/login', {
          //   login,
          //   password
          // })
          // .then(res => {
          //   UserService.login(res.data.token, res.data.userName, res.data.isAdmin);
          //   history.push('/');
          // })
          // .catch(res => {
          //   this.setState({
          //     login: '',
          //     password: ''
          //   });
          //   this.props.snackbar('Неверный логин или пароль');
          // })
      this.props.login(login, password)
      : this.props.snackbar('Заполните поля');
    this.setState({
      login: '',
      password: ''
    });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <form className="center">
        <h2>Вход</h2>
        <TextField
          id="login"
          label="Логин"
          type="search"
          margin="normal"
          value={this.state.login}
          onChange={this.handleChange('login')}
          fullWidth
          autoFocus={true}
          required
        />
        <br />
        <TextField
          id="password"
          label="Пароль"
          type="password"
          margin="normal"
          value={this.state.password}
          onChange={this.handleChange('password')}
          fullWidth
          required
        />
        <div className="form__button__container">
          <Button variant="contained" onClick={this.loginSubmit}>
            Войти
          </Button>
          <br/>
          <a onClick={this.props.action}>
            Зарегистрироваться
          </a>
        </div>
      </form>
    );
  }
}

export default connect(state =>({}), dispatch => ({
  login: (login, password) => {
    dispatch(logIn(login,password));
  }
}))(LogIn)
