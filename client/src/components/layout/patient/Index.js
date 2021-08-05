import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'

import Register from './Registration/Register'
import Login from './Registration/Login'
import Dashboard from './Dashboard/Index'
import setAuthToken from '../../../utils/setAuthToken'
import store from '../../../redux/store'
import { loadPatient } from '../../../redux/actions/patient/auth'

const Index = () => {

  useEffect(() => {
    // Load Patient
    if (localStorage.patientAuthToken) {
      setAuthToken(localStorage.patientAuthToken)
    }

    store.dispatch(loadPatient())
  }, [])


  return (
    <Switch>
      <Route exact path="/patient" component={Login} />
      <Route path="/patient/register" component={Register} />
      <Route path="/patient/login" component={Login} />
      <PrivateRoute path="/patient/dashboard" component={Dashboard} />
    </Switch>
  )
}

export default Index
