import axios from 'axios';
import types from '../types/user';
import UserService from '../Service/UserService';
import history from '../history';


export const loginSuccess = payload => {
  return { type: types.ON_LOGIN_SUCCESS, payload };
};

export const loginFailed = payload => {
  return { type: types.ON_LOGIN_FAILED, payload };
};

export const logout = () => {
  return {
    type: types.ON_LOGOUT
  }
}

export const clearError = () => {
  return { type: types.CLEAR_ERROR }
}

export const logIn = (login, password) => {
  return (dispatch) => {
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
};
