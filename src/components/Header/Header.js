import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import style from './style.scss';

export default class Header extends Component {
  state = {
    isAdmin: false,
    logIn: false,
    userName: '',
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logOut = () => {
    this.setState({ anchorEl: null });
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  };

  componentWillMount = () => {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    token
      ? this.setState({ logIn: true, userName })
      : this.setState({ logIn: false });
  };

  componentWillReceiveProps = () => {
    const userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    token
      ? this.setState({ logIn: true, userName })
      : this.setState({ logIn: false });
  };
  render() {
    const { logIn, userName, isAdmin, anchorEl } = this.state;
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
                <Button
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  {userName}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/admin"> Профиль </Link>
                  </MenuItem>
                  <MenuItem onClick={this.handleClose}>
                    <Link to="/"> Выйти </Link>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button
                  aria-owns={anchorEl ? 'simple-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  {userName}
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
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
