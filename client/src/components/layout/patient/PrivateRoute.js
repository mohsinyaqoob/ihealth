import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...rest }) => (
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/patient/login" />) : (<Component {...props} />)} />
)

const mapStateToProps = state => {
  return {
    isAuthenticated: state.patientAuth.isAuthenticated,
    loading: state.patientAuth.loading
  }
}

export default connect(mapStateToProps)(PrivateRoute)
