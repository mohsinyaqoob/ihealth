import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import Navbar from './Navbar'
import Aside from './Aside'
import MainContent from './MainContent'
import Footer from './Footer'

import EmergencyIndex from './Emergency/Index'
import AdmissionIndex from './Admission/Index'
import ConsultationIndex from './Consultation/Index'
import Treatment from './Patient/Treatment'
import RecordVitals from './Patient/RecordVitals'
import AllVitals from './Patient/AllVitals'
import AllMedications from './Patient/AllMedications'

const Dashboard = ({ loading, nurse }) => {
  return (
    <>
      <Navbar loading={loading} nurse={nurse} />
      <Aside loading={loading} nurse={nurse} />
      <Switch>
        <Route exact path="/nurse/dashboard" component={MainContent} />
        <Route exact path="/nurse/dashboard/emergency" component={EmergencyIndex} />
        <Route exact path="/nurse/dashboard/admission" component={AdmissionIndex} />
        <Route exact path="/nurse/dashboard/consultation" component={ConsultationIndex} />
        <Route exact path="/nurse/dashboard/treatment/:checkinId" component={Treatment} />
        <Route exact path="/nurse/dashboard/recordVitals/:checkinId" component={RecordVitals} />
        <Route exact path="/nurse/dashboard/allVitals/:checkinId" component={AllVitals} />
        <Route exact path="/nurse/dashboard/allMedications/:checkinId" component={AllMedications} />
      </Switch>
      <Footer />
    </>
  )
}

const mapStateToProps = state => ({
  loading: state.nurseAuthReducer.loading,
  nurse: state.nurseAuthReducer.nurse
})

export default connect(mapStateToProps)(Dashboard)
