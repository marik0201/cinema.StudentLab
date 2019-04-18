import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class SignUp extends Component {
  state = {
    name: '',
    login: '',
    password: '',
    repeatPasswod: ''
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  loginSubmit = () => {
    const { name, login, password, repeatPasswod } = this.state;
    if (!name || !login || !password || !repeatPasswod) {
      this.props.snackbar('Заполните все поля'),
        this.setState({
          name: '',
          login: '',
          password: '',
          repeatPasswod: ''
        });
    } else if (password !== repeatPasswod) {
      this.props.snackbar('Пароли не совпадают'),
        this.setState({
          password: '',
          repeatPasswod: ''
        });
    } else {
      axios
        .post('http://localhost:3000/api/auth/signup', { name, login, password })
        .then(res => {
          this.props.snackbar(
            'Вы зарегестрированы. Теперь можете войти на сайт'
          );
          this.setState({
            name: '',
            login: '',
            password: '',
            repeatPasswod: ''
          });
          this.props.action();
        })
        .catch(err => {
          err.response.data.errorMessages
            ? this.props.snackbar(err.response.data.errorMessages.join('; '))
            : this.props.snackbar(err.response.data.message);
        });
    }
  };

  render() {
    return (
      <form className="center">
        <h2>Регистрация</h2>
        <TextField
          id="name"
          label="Имя"
          type="search"
          margin="normal"
          value={this.state.name}
          onChange={this.handleChange('name')}
          fullWidth
        />
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
        <TextField
          id="repeatPassword"
          label="Повторите пароль"
          type="password"
          margin="normal"
          value={this.state.repeatPasswod}
          onChange={this.handleChange('repeatPasswod')}
          fullWidth
        />
        <div className="form__button__container">
          <Button variant="contained" onClick={this.loginSubmit}>
            Зарегестрироваться
          </Button>
          <br />
          <Button variant="contained" onClick={this.props.action}>
            Войти
          </Button>
        </div>
      </form>
    );
  }
}
