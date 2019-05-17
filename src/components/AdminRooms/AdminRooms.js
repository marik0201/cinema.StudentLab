import React, { Component } from 'react';

import CinemaNamesContainer from '../../containers/CinemaNamesContainer'
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import './style.scss';

const AdminRooms = () => {
  return <div className="rooms__container">
    <CinemaNamesContainer/>
    {/* <RoomSchema/> */}
  </div>;
};

export default AdminRooms;
