import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import UserService from '../../Service/UserService.js';
import style from './style.scss';

export default class Header extends Component {
  state = {
    isAdmin: UserService.isAdmin(),
    logIn: UserService.isLoggedIn(),
    userName: UserService.getUserName() ? UserService.getUserName() : '',
    menuAnchor: null
  };

  handleClick = event => {
    this.setState({ menuAnchor: event.currentTarget.firstChild });
  };

  handleClose = () => {
    this.setState({ menuAnchor: null });
  };

  logOut = () => {
    this.setState({ menuAnchor: null });
    UserService.logout();
  };

  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      UserService.isLoggedIn()
        ? this.setState({
            logIn: true,
            userName: UserService.getUserName(),
            isAdmin: UserService.isAdmin()
          })
        : this.setState({ logIn: false });
    }
  };

  render() {
    const { logIn, userName, isAdmin, menuAnchor } = this.state;
    return (
      <header>
        <div className="logo">
          <span>
            <Link to="/">Tickets</Link>
          </span>
        </div>
        <div className="header__user">
          {logIn ? (
            isAdmin ? (
              <>
                <Button onClick={this.handleClick}>{userName}</Button>
                <Menu
                  id="simple-menu"
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/admin"> Профиль </Link>
                  </MenuItem>
                  <MenuItem onClick={this.logOut}>
                    <Link to="/"> Выйти </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button onClick={this.handleClick}>{userName}</Button>
                <Menu
                  id="simple-menu"
                  anchorEl={menuAnchor}
                  open={Boolean(menuAnchor)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/user"> Профиль </Link>
                  </MenuItem>
                  <MenuItem onClick={this.logOut}>
                    <Link to="/"> Выйти </Link>
                  </MenuItem>
                </Menu>
              </>
            )
          ) : (
            <Link to="/auth">Войти</Link>
          )}
        </div>
      </header>
    );
  }
}
