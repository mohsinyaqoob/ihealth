import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'

import PrivateRoute from './Routing'
import Dashboard from './Dashboard'
import Login from './Login'

import setAuthToken from '../../../utils/setAuthToken'
import store from '../../../redux/store'
import { loadLab } from '../../../redux/actions/lab/auth'


const Index = () => {
  useEffect(() => {
    if (localStorage.labAuthToken) {
      setAuthToken(localStorage.labAuthToken)
    }
    store.dispatch(loadLab())
  }, [])

  return (
    <Switch>
      <Route path="/lab/login" component={Login} />
      <PrivateRoute path="/lab/dashboard" component={Dashboard} />
    </Switch>
  )
}

export default Index
