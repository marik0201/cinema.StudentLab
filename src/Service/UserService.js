export default class UserService {}

UserService.login = (token, userName) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userName', userName);
};
UserService.logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
};

UserService.getUserName = () => {
  return localStorage.getItem('userName');
};

UserService.setNewName = (newName) => {
  localStorage.setItem('userName', newName);
}

UserService.getToken = () => {
  return localStorage.getItem('token');
}

UserService.isLoggedIn = () => {
  return localStorage.getItem('token') ? true : false;        
};
