import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    margin: 0,
    width: '100%',
  },
  dense: {
    margin: 0,
  },
  menu: {
    width: 200,
  },
  
});

const currencies = [
  {
    value: 'Минск',
    label: 'Минск',
  },
  {
    value: 'Брест',
    label: 'Брест',
  },
  {
    value: 'Гродно',
    label: 'Гродно',
  },
  {
    value: 'Витебск',
    label: 'Витебск',
  },
];

class SearchCity extends React.Component {
  state = {
    name: 'Cat in the Hat',
    age: '',
    multiline: 'Controlled',
    currency: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        

        <TextField
          id="standard-select-currency"
          select
          label="Выбор"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="Выберите город"
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        
      </form>
    );
  }
}

SearchCity.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchCity);