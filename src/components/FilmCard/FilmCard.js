import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import "./style.scss";


 export default class FilmCard extends Component {
     render() {
         return (
             <div className="card">
                <div className="img__container" style={{
                    backgroundImage: `url(https://pluggedin.ru/images/upload/1544451083.jpg)`,
                    backgroundSize: 'cover',
                }}>
                
                </div>
                <div>
                <h3>Film</h3>
                
                </div>
             </div>
         )
     }
 }
