import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './style.scss';

export default class Header extends Component {
  state = {
    isAdmin: false,
    logIn: false,
    userName: 'UserName'
  };

  render() {
    const { logIn, userName, isAdmin } = this.state;
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
              <Link to="/admin">{userName}</Link>
            ) : (
              <Link to="/user"> {userName}</Link>
            )
          ) : (
            <Link to="/auth">Войти</Link>
          )}
        </div>
      </header>
    );
  }
}
