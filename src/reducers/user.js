import types from "../types/user";
import UserService from '../Service/UserService';

const initialState = {
    isAuth: false,
    isAdmin: false,
    userName: ''
  };
  
  export function users (state = initialState, action) {
    switch (action.type) {
  
      case types.ON_LOGIN_OR_REGISTER_FAILED:
        return {
          ...state,
          isLoginOrRegisterFetching: false,
          error: action.payload
        };
  
      case types.ON_LOGIN_SUCCESS:
      console.log(action.payload);
      
      UserService.login(action.payload.token, action.payload.userName, action.payload.isAdmin);
        return {
          ...state,
          isAuth: true,
          userName: action.payload.userName || state.userName,
          token: action.payload.token
        };
        
        case types.ON_REGISTER_SUCCESS:
            return {
                ...state
            };
  
      case types.ON_LOGOUT:
        UserService.logout();
        return { ...state, isAuth: false, userName: '' };
  
      default:
        return state;
    }
  };