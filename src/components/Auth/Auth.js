import React, { Component } from 'react';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import Snackbar from '@material-ui/core/Snackbar';
import './style.scss';

export default class Auth extends Component {
  state = {
    logIn: true,
    snackMessage: '',
    openSnack: false,
    vertical: 'bottom',
    horizontal: 'center'
  };

  toggleForm = () => {
    this.setState(prevState => ({
      logIn: !prevState.logIn
    }));
  };

  openSnackbar = message => {
    this.setState({ snackMessage: message, openSnack: true });
    setTimeout(() => 
        this.setState({
          openSnack: false
        }), 3000)
  };

  render() {
    const { vertical, horizontal, openSnack } = this.state;
    return (
      <div className="auth__container">
        <div className="auth__form">
          {this.state.logIn ? (
            <LogIn action={this.toggleForm} snackbar={this.openSnackbar} />
          ) : (
            <SignUp action={this.toggleForm} snackbar={this.openSnackbar}/>
          )}
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnack}
            onClose={this.handleClose}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">{this.state.snackMessage}</span>}
          />
        </div>
      </div>
    );
  }
}
