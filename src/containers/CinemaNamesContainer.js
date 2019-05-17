import React from 'react';
import { connect } from 'react-redux';
import { getCinemas } from '../actions/cinemas'
import CinemaNames from '../components/CinemaNames/CinemaNames';

const CinemaNamesContainer = props => <CinemaNames {...props} />;

const mapStateToProps = ({cinemas}) => ({
  cinemas
});

const mapDispatchToProps = dispatch => ({
  getCinemas: () => {
    dispatch(getCinemas());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CinemaNamesContainer);
