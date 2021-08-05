import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Login from './Login'
import store from '../../../redux/store'
import setAuthToken from '../../../utils/setAuthToken'
import { loadHospital } from '../../../redux/actions/hospital/auth'
import PrivateRoute from './routing/PrivateRoute'
import Dashboard from './Dashboard'

const Index = () => {

    useEffect(() => {
        if (localStorage.hospitalToken) {
            setAuthToken(localStorage.hospitalToken)
        }
        store.dispatch(loadHospital())
    }, [])

    return (
        <Switch>
            <Route path="/hospital/login" component={Login} />
            <PrivateRoute path="/hospital/dashboard" component={Dashboard} />
        </Switch>

    )
}

export default Index
