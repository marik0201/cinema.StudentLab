import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import history from '../../history';

export default class LogIn extends Component {
  state = {
    login: '',
    password: ''
  };

  loginSubmit = () => {
    const { login, password } = this.state;

    login && password
      ? axios
          .post('http://localhost:3000/api/login', {
            login,
            password
          })
          .then(res => {
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('userName', res.data.userName);
            localStorage.setItem('userLogin', res.data.userLogin);
            history.push('/');
          })
          .catch(res => {
            this.setState({
              login: '',
              password: ''
            });
            this.props.snackbar('Неверный логин или пароль');
          })
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
        />
        <div className="form__button__container">
          <Button variant="contained" onClick={this.loginSubmit}>
            Войти
          </Button>
          <Button variant="contained" onClick={this.props.action}>
            Регистрация
          </Button>
        </div>
      </form>
    );
  }
}
