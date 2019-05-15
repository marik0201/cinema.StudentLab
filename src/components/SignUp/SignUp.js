import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import history from '../../history';
import { signup, clearError, clearMessage } from '../../actions/user';

class SignUp extends Component {
  constructor(props) {
    super(props);
    history.listen(() => {
      this.props.clearError();
      this.props.clearMessage();
    });
  }

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
      this.props.snackbar('Заполните все поля');
      if (!name) {
        this.setState({
          isNameError: true,
          nameValidationError: 'Заполните поле'
        });
      }
      if (!login) {
        this.setState({
          isLoginError: true,
          loginValidationError: 'Заполните поле'
        });
      }
      if (!password) {
        this.setState({
          isPasswordError: true,
          passwordValidationError: 'Заполните поле'
        });
      }
      if (!repeatPasswod) {
        this.setState({
          isRepeatpasswordError: true,
          repeatpasswordValidationError: 'Заполните поле'
        });
      }
    } else if (password !== repeatPasswod) {
      this.props.snackbar('Пароли не совпадают'),
        this.setState({
          password: '',
          repeatPasswod: ''
        });
    } else {
      this.props.register(name, login, password);

      this.setState({
        name: '',
        login: '',
        password: '',
        repeatPasswod: ''
      });

      this.props.clearError();
      this.props.clearMessage();
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
    const { isRegisterSuccess, errorRegisterMessage } = this.props.state.users;
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
            Зарегистрироваться
          </Button>
          <br />
          <a onClick={this.props.action}>Войти в аккаунт</a>
          {isRegisterSuccess && (
            <span className="successMessage">Вы успешно зарегестрированы</span>
          )}
          {errorRegisterMessage && (
            <span className="errorSpan">{errorRegisterMessage}</span>
          )}
        </div>
      </form>
    );
  }
}

export default connect(
  state => ({
    state
  }),
  dispatch => ({
    register: (name, login, password) => {
      dispatch(signup(name, login, password));
    },
    clearError: () => {
      dispatch(clearError());
    },
    clearMessage: () => {
      dispatch(clearMessage());
    }
  })
)(SignUp);
