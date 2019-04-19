import React, { Component } from 'react';
import axios from 'axios';
import UserTicketsCard from '../UserTicketsCard/UserTicketsCard';
import UserService from '../../Service/UserService.js';
import history from '../../history';
import style from './style.scss';

export default class UserTickets extends Component {
  state = {
    tickets: []
  };

  componentDidMount = () => {
    axios
      .get('http://localhost:3000/api/tickets', {
        headers: {
          Authorization: 'JWT ' + UserService.getToken(),
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.setState({
          tickets: res.data.tickets.reverse()
        });
      });
  };

  render() {
    return (
      <div className="userTickets__container">
        <div className="userTickets__card">
          <h3>Ваши билеты: </h3>
          {this.state.tickets.map(item => (
            <UserTicketsCard item={item} key={item._id} />
          ))}
        </div>
      </div>
    );
  }
}
