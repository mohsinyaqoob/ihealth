import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import MainContent from './MainContent'
import LabInvestigation from './LabInvestigation'
import Navbar from './Navbar'
import Aside from './Aside'
import Footer from './Footer'

const Dashboard = ({ loading, lab }) => {
  return (
    <>
      <Navbar loading={loading} lab={lab} />
      <Aside loading={loading} lab={lab} />
      <Switch>
        <Route exact path="/lab/dashboard" component={MainContent} />
        <Route exact path="/lab/dashboard/labInvestigation" component={LabInvestigation} />
      </Switch>
      <Footer />
    </>
  )
}

const mapStateToProps = state => ({
  loading: state.labAuthReducer.loading,
  lab: state.labAuthReducer.lab,
})

export default connect(mapStateToProps)(Dashboard)
