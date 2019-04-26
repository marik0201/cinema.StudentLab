export default class UserService {}

UserService.login = (token, userName, isAdmin) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userName', userName);
  localStorage.setItem('isAdmin', isAdmin);
};
UserService.logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userName');
  localStorage.removeItem('isAdmin');
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

UserService.isAdmin = () => {
   return localStorage.getItem('isAdmin') === 'true' ? true : false;  
}

UserService.isLoggedIn = () => {
  return localStorage.getItem('token') ? true : false;        
};
