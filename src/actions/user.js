import axios from 'axios';
import types from '../types/user';
import UserService from '../Service/UserService';
import history from '../history';

export const loginSuccess = payload => {
  return { type: types.ON_LOGIN_SUCCESS, payload };
};

export const loginFailed = () => {
  return { type: types.ON_LOGIN_FAILED };
};

export const logout = () => {
  return {
    type: types.ON_LOGOUT
  };
};

export const clearError = () => {
  return { type: types.CLEAR_ERROR };
};

export const clearMessage = () => {
  return { type: types.CLEAR_MESSAGE };
};

export const registerSuccess = () => {
  return { type: types.ON_REGISTER_SUCCESS };
};

export const registerFailed = payload => {
  return { type: types.ON_REGISTER_FAILED, payload };
};

export const logIn = (login, password) => dispatch => {
  return axios
    .post('http://localhost:3000/api/auth/login', {
      login,
      password
    })
    .then(res => {
      dispatch(loginSuccess(res.data));
      history.push('/');
    })
    .catch(res => {
      dispatch(loginFailed(res.data));
    });
};

export const signup = (name, login, password) => dispatch => {
  return axios
    .post('http://localhost:3000/api/auth/signup', {
      name,
      login,
      password
    })
    .then(res => {
      dispatch(registerSuccess());
    })
    .catch(err => {
      err.response.data.errorMessages
        ? dispatch(registerFailed(err.response.data.errorMessages.join('; ')))
        : dispatch(registerFailed(err.response.data.message));
    });
};
