import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'

import Login from './Login'
import PrivateRoute from './Routing'
import Dashboard from './Dashboard'

import store from '../../../redux/store'
import { loadNurse } from '../../../redux/actions/nurse/auth'
import setAuthToken from '../../../utils/setAuthToken'


const Index = () => {

  useEffect(() => {
    if (localStorage.nurseAuthToken) {
      setAuthToken(localStorage.nurseAuthToken)
    }
    store.dispatch(loadNurse())
  }, [])


  return (
    <Switch>
      <Route exact path="/nurse/login" component={Login} />
      {/* PrivateRoutes */}
      <PrivateRoute path="/nurse/dashboard" component={Dashboard} />
    </Switch>
  )
}

export default Index
