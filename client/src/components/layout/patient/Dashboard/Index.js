import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Navbar from './Shared/Navbar'
import Aside from './Shared/Aside'
import Footer from './Shared/Footer'
import MainContent from './MainContent'
import Unverified from './Shared/Unverified'
import Checkins from './Checkins'

const Dashboard = ({ loading, isAuthenticated, patient }) => {
  return (
    <div>
      {
        !loading && isAuthenticated && patient && (
          patient.birthHospitalVerified ? (
            <div>
              <Navbar />
              <Aside />
              <Switch>
                <Route exact path="/patient/dashboard" component={MainContent} />
                <Route exact path="/patient/dashboard/checkins" component={Checkins} />
              </Switch>
              <Footer />
            </div>
          ) : (<Unverified patient={patient} />)
        )
      }
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.patientAuth.loading,
  isAuthenticated: state.patientAuth.isAuthenticated,
  patient: state.patientAuth.patient
})

export default connect(mapStateToProps)(Dashboard)
