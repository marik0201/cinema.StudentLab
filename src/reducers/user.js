import types from '../types/user';
import UserService from '../Service/UserService';


const initialState = {
  isAuth: UserService.getToken() ? true : false,
  isAdmin: UserService.isAdmin(),
  userName: UserService.getUserName() || '',
  isLoginFailed: false
};

export function users(state = initialState, action) {
  switch (action.type) {
    case types.ON_LOGIN_FAILED:
      return {
        ...state,
        isLoginFailed: true
      };

    case types.ON_LOGIN_SUCCESS:
      UserService.login(
        action.payload.token,
        action.payload.userName,
        action.payload.isAdmin
      );
      return {
        ...state,
        isAuth: true,
        isAdmin: action.payload.isAdmin,
        userName: action.payload.userName || state.userName,
        token: action.payload.token
      };

    case types.ON_REGISTER_SUCCESS:
      return {
        ...state
      };

    case types.ON_LOGOUT:
      UserService.logout();
      return { ...state, isAuth: false, userName: '', isAdmin: false };

    case types.CLEAR_ERROR:
    return { ...state, isLoginFailed: false }

    default:
      return state;
  }
}
