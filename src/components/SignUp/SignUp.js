import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class SignUp extends Component {
    state = {
        
    }
    
    loginSubmit = () => {
        console.log(1);
        
    }

     render() {
         return (
                <form  className="center">
                    <TextField
                    id="login"
                    label="Логин"
                    type="search"
                    margin="normal"
                    /> <br/>
                    <TextField
                    id="password"
                    label="Пароль"
                    type="search"
                    margin="normal"
                    /><br/>
                    <Button variant="contained" >
                        Зарегестрироваться
                    </Button><br/>
                    <Button variant="contained" onClick={this.props.action} >
                        Войти
                    </Button>
                    </form>
         )
     }
 }