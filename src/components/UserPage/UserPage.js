import React, { Component } from 'react';

import UserTickets from '../UserTickets/UserTickets';
import UserInfo from '../UserInfo/UserInfo';
import style from './style.scss';

export default class UserPage extends Component {
  render() {
    return (
      <div className='userPage__container'>
        <UserTickets/>
        <UserInfo/>
      </div>
      )
  }
}
