import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './routing/PrivateRoute'
import Login from './Login'
import Dashboard from './Dashboard'
import Export from './Patient/Export'

import setAuthToken from '../../../utils/setAuthToken'
import store from '../../../redux/store'
import { loadDoctor } from '../../../redux/actions/doctor/auth'
const Index = () => {

  useEffect(() => {
    if (localStorage.doctorToken) {
      setAuthToken(localStorage.doctorToken)
    }
    store.dispatch(loadDoctor())
  }, [])

  return (
    <Switch>
      <Route exact path="/doctor/login" component={Login} />
      <PrivateRoute path="/doctor/dashboard" component={Dashboard} />
      <PrivateRoute path="/doctor/export/:checkinId" component={Export} />
    </Switch>
  )
}

export default Index
