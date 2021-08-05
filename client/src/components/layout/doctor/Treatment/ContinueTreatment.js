import React from 'react'

import RecentVitals from '../Patient/RecentVitals'
import RecentTests from '../Patient/RecentTests'
import RecentDiagnosis from '../Patient/RecentDiagnosis'
import HealthTimeline from '../Patient/HealthTimeline'
import PatientDetails from '../Patient/PatientDetails'
import PatientComplaint from '../Patient/PatientComplaint'

import '../../../../assets/css/timeline.css'
import RecentMedications from '../Patient/RecentMedications'

const ContinueTreatment = props => {

  const checkinId = props.match.params.checkinId;

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              {/* <h1 className="m-0">{props.match.params.patientId}</h1> */}
              <span className="p-2 m-0 h4">
                Continue Treatment
              </span>
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
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <RecentMedications checkinId={checkinId} showTotal={3} />
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div >

  )
}

export default ContinueTreatment
