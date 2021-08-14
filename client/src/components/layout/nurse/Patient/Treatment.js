import React from 'react'
import HealthTimeline from './HealthTimeline'
import PatientDetails from './PatientDetails'
import RecentVitals from './RecentVitals'

const Treatment = props => {
  const checkinId = props.match.params.checkinId
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              {/* <h1 className="m-0">{props.match.params.patientId}</h1> */}
              <h1 className="m-0">
                Treatment
              </h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Nurse</li>
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
            <div className="col-md-7">
              {/* Health Timeline */}
              <RecentVitals checkinId={checkinId} showTotal={5} />
              <RecentVitals checkinId={checkinId} showTotal={5} />
              <h1>View Medications</h1>
            </div>
            <div className="col-md-5">
              {/* Recent Info */}
              <HealthTimeline checkinId={checkinId} />
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div >
  )
}

export default Treatment
