import axios from "axios";
import types from "../types/user";
import history from '../history';


export const loginSuccess = payload => {
    type: types.ON_LOGIN_SUCCESS,
    payload
}

export const logIn = (login, password) => {
    return (dispatch, getState) => {
  console.log(login,password);
  

     return axios
          .post('http://localhost:3000/api/auth/login', {
            login,
            password
          })
          .then(res => {
            dispatch(loginSuccess(res.data));
            UserService.login(res.data.token, res.data.userName, res.data.isAdmin);
            history.push('/');
          })
          .catch(res => {
              console.log(res);
              
          })
    };
  };