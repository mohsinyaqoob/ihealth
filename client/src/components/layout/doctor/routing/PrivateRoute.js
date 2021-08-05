import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...rest }) => (
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/doctor/login" />) : (<Component {...props} />)} />
)

const mapStateToProps = state => {
  return {
    loading: state.doctorAuthReducer.loading,
    isAuthenticated: state.doctorAuthReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(PrivateRoute)
