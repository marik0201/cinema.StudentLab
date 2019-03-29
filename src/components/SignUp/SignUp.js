import React, { Component } from 'react';
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
    console.log(this.state.login);
    console.log(this.state.name);
    console.log(this.state.password);
    console.log(this.state.repeatPasswod);
    
    
    
    
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
          <Button variant="contained" onClick={this.loginSubmit}>Зарегестрироваться</Button>
          <br />
          <Button variant="contained" onClick={this.props.action}>
            Войти
          </Button>
        </div>
      </form>
    );
  }
}
