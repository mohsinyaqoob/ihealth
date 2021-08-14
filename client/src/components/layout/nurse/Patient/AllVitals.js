import React from 'react'
import RecentVitals from './RecentVitals'
import PatientDetails from './PatientDetails'

const AllVitals = props => <div className="content-wrapper">
  {/* Content Header (Page header) */}
  <div className="content-header">
    <div className="container-fluid">
      <div className="mb-2 row">
        <div className="col-sm-6">
          <h1 className="m-0">Vitals</h1>
        </div>{/* /.col */}
        <div className="col-sm-6">
          <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item">Nurse</li>
            <li className="breadcrumb-item">Dashboard</li>
            <li className="breadcrumb-item">Vitals</li>
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
          <RecentVitals checkinId={props.match.params.checkinId} showTotal={1000} />
        </div>
      </div>
    </div>{/*/. container-fluid */}
  </section>
  {/* /.content */}
</div>

export default AllVitals
