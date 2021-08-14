import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...rest }) => (
  <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/lab/login" />) : (<Component {...props} />)} />
)

const mapStateToProps = state => {
  return {
    isAuthenticated: state.labAuthReducer.isAuthenticated,
    loading: state.labAuthReducer.loading
  }
}

export default connect(mapStateToProps)(PrivateRoute)
