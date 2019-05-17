import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

import './style.scss';

export default class CinemaNames extends Component {
  constructor(props) {
    super(props);
    this.props.getCinemas();
  }

  componentDidMount = () => {
      console.log(this.props.cinemas);
      
  }
  render() {
    return (
      <div className="cinemaNames__card">
        {this.props.cinemas.map(item => {
          <Button variant="contained">{item.name}</Button>;
        })}
      </div>
    );
  }
}
