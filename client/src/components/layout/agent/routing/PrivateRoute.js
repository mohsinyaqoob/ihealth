import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...rest }) => (
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/agent/login" />) : (<Component {...props} />)} />
)

const mapStateToProps = state => {
  return {
    loading: state.agentAuthReducer.loading,
    isAuthenticated: state.agentAuthReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(PrivateRoute)
