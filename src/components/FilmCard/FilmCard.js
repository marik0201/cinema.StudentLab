import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import "./style.scss";


 export default class FilmCard extends Component {
     render() {
         return (
             <div className="card">
                <div className="img__container" style={{
                    backgroundImage: `url(${this.props.item.url})`,
                    backgroundSize: 'cover',
                }}/>
                <div>
                <h3>{this.props.item.name}</h3> 
                <Button variant="contained">
                    Заказать
                </Button>               
                </div>
             </div>
         )
     }
 }
