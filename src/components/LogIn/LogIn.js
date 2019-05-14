import React, { Component } from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

import UserService from '../../Service/UserService.js';
import history from '../../history';
import { logIn, clearError } from '../../actions/user';

class LogIn extends Component {
  constructor(props) {
    super(props);
    history.listen(() => {
      this.props.clearError();
    });
  }

  state = {
    login: '',
    password: ''
  };

  loginSubmit = () => {
    const { login, password } = this.state;
    login && password
      ? this.props.login(login, password)
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
    const isLoginFailed = this.props.state.users.isLoginFailed;
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
          <br />
          <a onClick={this.props.action}>Зарегистрироваться</a>
          {isLoginFailed && <span className="errorSpan">Неверный логин или пароль</span>}
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
    login: (login, password) => {
      dispatch(logIn(login, password));
    },
    clearError: () => {
      dispatch(clearError());
    }
  })
)(LogIn);
