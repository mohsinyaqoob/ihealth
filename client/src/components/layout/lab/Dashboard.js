import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import MainContent from './MainContent'
import BodyFluidInvestigation from './Laboratory/BodyFluidInvestigation'
import UploadLabReport from './Laboratory/UploadLabReport'
import RevealAssignedLabTests from './Laboratory/RevealAssignedLabTests'
import ImageInvestigation from './Imaging/ImageInvestigation'
import Navbar from './Navbar'
import Aside from './Aside'
import Footer from './Footer'
import RevealAssignedImagingTests from './Imaging/RevealAssignedImagingTests'
import UploadImagingReport from './Imaging/UploadImagingReport'

const Dashboard = ({ loading, lab }) => {
  return (
    <>
      <Navbar loading={loading} lab={lab} />
      <Aside loading={loading} lab={lab} />
      <Switch>
        <Route exact path="/lab/dashboard" component={MainContent} />
        <Route exact path="/lab/dashboard/bodyFluidInvestigation" component={BodyFluidInvestigation} />
        <Route exact path="/lab/dashboard/revealAssignedLabTests/:patientId" component={RevealAssignedLabTests} />
        <Route exact path="/lab/dashboard/uploadLabReport/:patientId/:testId" component={UploadLabReport} />
        <Route exact path="/lab/dashboard/imageInvestigation" component={ImageInvestigation} />
        <Route exact path="/lab/dashboard/revealAssignedImagingTests/:patientId" component={RevealAssignedImagingTests} />
        <Route exact path="/lab/dashboard/uploadImagingReport/:patientId/:testId" component={UploadImagingReport} />
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
