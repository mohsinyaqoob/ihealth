import React, { useEffect, useState } from 'react'

import RecentVitals from '../Patient/RecentVitals'
import RecentTests from '../Patient/RecentTests'
import RecentDiagnosis from '../Patient/RecentDiagnosis'
import HealthTimeline from '../Patient/HealthTimeline'
import PatientDetails from '../Patient/PatientDetails'
import PatientComplaint from '../Patient/PatientComplaint'

import '../../../../assets/css/timeline.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import RecentMedications from '../Patient/RecentMedications'

const Index = props => {

  const checkinId = props.match.params.checkinId;

  // Set treatmentStatus to 2: not completed
  useEffect(() => {
    axios.put('/api/doctor/treatment/treatmentStatus',
      JSON.stringify({ status: 2, checkinId: checkinId }),
      {
        headers: { 'Content-type': 'application/json' }
      })
      .then(res => { })
      .catch(err => {
        const errors = err.response.data.errors;
        errors.forEach(error => toast(error.msg, { type: 'error' }))
      })
  }, [])

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              {/* <h1 className="m-0">{props.match.params.patientId}</h1> */}
              <h1 className="m-0">
                Start Treatment
              </h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Doctor</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Treatment</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Patient Details */}
          <div className="row">
            <div className="col-md-12">
              <PatientDetails checkinId={checkinId} />
            </div>
          </div>

          {/* Treatment Body */}
          <div className="row">
            <div className="col-md-5">
              {/* Health Timeline */}
              <HealthTimeline checkinId={checkinId} />
            </div>
            <div className="col-md-7">
              {/* Recent Info */}
              <PatientComplaint checkinId={checkinId} />
              <RecentVitals checkinId={checkinId} showTotal={3} />
              <RecentTests checkinId={checkinId} showTotal={3} />
              <RecentDiagnosis checkinId={checkinId} showTotal={3} />
              <RecentMedications checkinId={checkinId} showTotal={3} />
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div >
  )
}

export default Index
