import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import LogIn from '../LogIn/LogIn';
import SignUp from '../SignUp/SignUp';
import "./style.scss";


export default class Auth extends Component {
    state = {
        logIn: true
    }

    toggleForm = () => {
        this.setState(prevState =>({
            logIn: !prevState.logIn
        }))
    }

     render() {
         return (
             <div className="auth__container">
                <div className="auth__form">
                {this.state.logIn ? (
                    <LogIn action={this.toggleForm}/>) : (<SignUp action={this.toggleForm}/>)}
                    {/* <Registration/> */}
                </div>
             </div>
         )
     }
 }
