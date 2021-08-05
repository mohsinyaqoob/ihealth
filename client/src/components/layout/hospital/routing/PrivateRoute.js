import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component: Component, isAuthenticated, loading, ...rest }) => (
    <Route {...rest} render={props => !isAuthenticated && !loading ? (<Redirect to="/hospital/login" />) : (<Component {...props} />)} />
)

const mapStateToProps = state => {
    return {
        isAuthenticated: state.hospitalAuthReducer.isAuthenticated,
        loading: state.hospitalAuthReducer.loading
    }
}

export default connect(mapStateToProps)(PrivateRoute)
