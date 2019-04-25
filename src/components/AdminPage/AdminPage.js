import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AdminUsers from '../AdminUsers/AdminUsers';
import AdminFilms from '../AdminFilms/AdminFilms';
import AdminSessions from '../AdminSessions/AdminSessions';

export default class AdminPage extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <Paper>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Пользователи" />
            <Tab label="Фильмы" />
            <Tab label="Сеансы" />
          </Tabs>
        </Paper>
        {value === 0 && <AdminUsers />}
        {value === 1 && <AdminFilms />}
        {value === 2 && <AdminSessions />}
      </>
    );
  }
}
