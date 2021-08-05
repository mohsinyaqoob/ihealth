import React from 'react'
import PatientDetails from './PatientDetails'
import RecentDiagnosis from './RecentDiagnosis'

const AllVitals = props => <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="mb-2 row">
        <div className="col-sm-6">
          <h1 className="m-0">All Diagnosis</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">Doctor</li>
            <li className="breadcrumb-item">Dashboard</li>
          </ol>
        </div>{/* /.col */}
      </div>{/* /.row */}
    </div>{/* /.container-fluid */}
  </div>
  {/* /.content-header */}
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <PatientDetails checkinId={props.match.params.checkinId} />
          <RecentDiagnosis checkinId={props.match.params.checkinId} showTotal={10000} />
        </div>
      </div>
    </div>{/*/. container-fluid */}
  </section>
  {/* /.content */}
</div>

export default AllVitals
