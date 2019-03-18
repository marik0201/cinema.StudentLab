import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from "./style.scss";

export default class Header extends Component {
    state = {
        isAdmin: false,
        logIn: false,
        userName: "Admin"
    }



    render() {
        const {logIn, userName} = this.state;
        return(
        <header>
            <div className="logo">
                <span>Tickets</span>
            </div>
            <div className="header__user">
                {logIn ? (
                    <button>{userName}</button>
                ):(<button>Войти</button>)}
            </div>
        </header>
        )
    }
}