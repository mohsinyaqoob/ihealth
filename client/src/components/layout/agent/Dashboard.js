import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Navbar from './Navbar'
import Aside from './Aside'
import MainContent from './MainContent'
import Emergency from './Emergency/Index'
import Admission from './Admission/Index'
import Consultation from './Consultation/Index'
import Checkins from './Checkins'
import Footer from './Footer'

const Dashboard = ({ loading, agent }) => {
  return (
    <div>
      <Navbar loading={loading} agent={agent} />
      <Aside loading={loading} agent={agent} />
      <Switch>
        <Route exact path="/agent/dashboard" component={MainContent} />
        <Route exact path="/agent/dashboard/quickCare" component={Emergency} />
        <Route exact path="/agent/dashboard/admission" component={Admission} />
        <Route exact path="/agent/dashboard/consultation" component={Consultation} />
        <Route exact path="/agent/dashboard/checkins" component={Checkins} />
      </Switch>
      <Footer />
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.agentAuthReducer.loading,
  agent: state.agentAuthReducer.agent
})

export default connect(mapStateToProps)(Dashboard)
