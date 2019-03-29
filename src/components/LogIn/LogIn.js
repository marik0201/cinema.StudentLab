import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class LogIn extends Component {
    state = {
        
    }
    
    loginSubmit = () => {
        console.log(1);
        
    }

     render() {
         return (
                <form  className="center">
                <h2>Вход</h2>
                    <TextField
                    id="login"
                    label="Логин"
                    type="search"
                    margin="normal"
                    fullWidth
                    /> <br/>
                    <TextField
                    id="password"
                    label="Пароль"
                    type="search"
                    margin="normal"
                    fullWidth
                    />
                    <div className="form__button__container">
                    <Button variant="contained" onClick={this.props.action}>
                        Войти
                    </Button>
                    <Button variant="contained" onClick={this.props.action} >
                        Регистрация
                    </Button>
                    </div>
                    </form> 
         )
     }
 }