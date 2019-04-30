import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class SignUp extends Component {
  state = {
    name: '',
    login: '',
    password: '',
    repeatPasswod: '',
    isNameError: false,
    nameValidationError: '',
    isLoginError: false,
    loginValidationError: '',
    isPasswordError: false,
    passwordValidationError: '',
    isRepeatpasswordError: false,
    repeatpasswordValidationError: ''
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
        .post('http://localhost:3000/api/auth/signup', {
          name,
          login,
          password
        })
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

  validateName = e => {
    const nameRegex = '^[а-яА-Яa-zA-Z]{1,15}$';
    if (e.target.value.match(nameRegex) || e.target.value === '') {
      this.setState({
        isNameError: false,
        nameValidationError: ''
      });
    } else {
      this.setState({
        isNameError: true,
        nameValidationError: 'Не больше 15 символов и не должно содержать цифры'
      });
    }
  };

  validateLogin = e => {
    const loginRegex = '[a-zA-Z0-9]';

    if (
      (e.target.value.length >= 3 && e.target.value.length <= 12) ||
      e.target.value === ''
    ) {
      if (e.target.value.match(loginRegex) || e.target.value === '') {
        this.setState({
          isLoginError: false,
          loginValidationError: ''
        });
      } else {
        this.setState({
          isLoginError: true,
          loginValidationError: 'Только английские буквы и цифры'
        });
      }
    } else {
      this.setState({
        isLoginError: true,
        loginValidationError: 'Длина от 3 до 12 символов'
      });
    }
  };

  validateRepeatpassword = e => {
    this.state.password === e.target.value || e.target.value === ''
      ? this.setState({
          isRepeatpasswordError: false,
          repeatpasswordValidationError: ''
        })
      : this.setState({
          isRepeatpasswordError: true,
          repeatpasswordValidationError: 'Пароли не совпадают'
        });
  };

  validatePassword = e => {
    const passwordRegex =
      '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,})$';
    if (e.target.value.match(passwordRegex) || e.target.value === '') {
      this.setState({
        isPasswordError: false,
        passwordValidationError: ''
      });
    } else {
      this.setState({
        isPasswordError: true,
        passwordValidationError:
          'Должен содержать заглавные, строчные английские буквы и цифры (не менее 8 символов)'
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
          onBlur={this.validateName}
          error={this.state.isNameError}
          helperText={this.state.nameValidationError}
          fullWidth
        />
        <TextField
          id="login"
          label="Логин"
          type="search"
          margin="normal"
          value={this.state.login}
          onChange={this.handleChange('login')}
          onBlur={this.validateLogin}
          error={this.state.isLoginError}
          helperText={this.state.loginValidationError}
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
          onBlur={this.validatePassword}
          error={this.state.isPasswordError}
          helperText={this.state.passwordValidationError}
          fullWidth
        />
        <TextField
          id="repeatPassword"
          label="Повторите пароль"
          type="password"
          margin="normal"
          value={this.state.repeatPasswod}
          onChange={this.handleChange('repeatPasswod')}
          onBlur={this.validateRepeatpassword}
          error={this.state.isRepeatpasswordError}
          helperText={this.state.repeatpasswordValidationError}
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
