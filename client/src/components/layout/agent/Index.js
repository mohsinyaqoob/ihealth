import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login'
import PrivateRoute from './routing/PrivateRoute'
import Dashboard from './Dashboard'

import setAuthToken from '../../../utils/setAuthToken'
import store from '../../../redux/store'
import { loadAgent } from '../../../redux/actions/agent/auth'

const Index = () => {

  useEffect(() => {
    if (localStorage.agentToken) {
      setAuthToken(localStorage.agentToken)
    }
    store.dispatch(loadAgent())
  }, [])

  return (
    <Switch>
      <Route exact path="/agent/login" component={Login} />
      <PrivateRoute path="/agent/dashboard" component={Dashboard} />
    </Switch>
  )
}

export default Index
