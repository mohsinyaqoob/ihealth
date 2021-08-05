import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Navbar from './Navbar'
import Aside from './Aside'
import Footer from './Footer'
import MainContent from './MainContent'
import EmergencyIndex from './Emergency/Index'
import AdmissionIndex from './Admission/Index'
import ConsultationIndex from './Consultation/Index'
import StartTreatment from './Treatment/StartTreatment'
import ReportVitalsForm from './Patient/ReportVitalsForm'
import AllVitals from './Patient/AllVitals'
import ContinueTreatment from './Treatment/ContinueTreatment'
import AssignTests from './Patient/AssignTests'
import AllTests from './Patient/AllTests'
import RecordDiagnosis from './Patient/DiagnosisForm'
import AllDiagnosis from './Patient/AllDiagnosis'
import RecordComplaints from './Patient/RecordComplaints'
import AddMedications from './Patient/AddMedications'
import DetailedCheckin from './Patient/DetailedCheckin'

const Dashboard = ({ loading, doctor }) => {

  return (
    <>
      <Navbar loading={loading} doctor={doctor} />
      <Aside loading={loading} doctor={doctor} />

      <Switch>
        <Route exact path="/doctor/dashboard" component={MainContent} />
        <Route exact path="/doctor/dashboard/emergency" component={EmergencyIndex} />
        <Route exact path="/doctor/dashboard/admission" component={AdmissionIndex} />
        <Route exact path="/doctor/dashboard/consultation" component={ConsultationIndex} />
        <Route path="/doctor/dashboard/startTreatment/:checkinId" component={StartTreatment} />
        <Route path="/doctor/dashboard/continueTreatment/:checkinId" component={ContinueTreatment} />
        <Route path="/doctor/dashboard/reportVitals/:checkinId" component={ReportVitalsForm} />
        <Route path="/doctor/dashboard/allVitals/:checkinId" component={AllVitals} />
        <Route path="/doctor/dashboard/assignTests/:checkinId" component={AssignTests} />
        <Route path="/doctor/dashboard/allTests/:checkinId" component={AllTests} />
        <Route path="/doctor/dashboard/recordDiagnosis/:checkinId" component={RecordDiagnosis} />
        <Route path="/doctor/dashboard/allDiagnosis/:checkinId" component={AllDiagnosis} />
        <Route path="/doctor/dashboard/recordComplaints/:checkinId" component={RecordComplaints} />
        <Route path="/doctor/dashboard/addMedications/:checkinId" component={AddMedications} />
        <Route path="/doctor/dashboard/detailedCheckin/:checkinId" component={DetailedCheckin} />
      </Switch>
      <Footer />
    </>
  )
}

const mapStateToProps = state => ({
  loading: state.doctorAuthReducer.loading,
  doctor: state.doctorAuthReducer.doctor
})

export default connect(mapStateToProps)(Dashboard)
