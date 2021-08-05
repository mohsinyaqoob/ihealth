import React from 'react'
import { connect } from 'react-redux'

import AadhaarFetch from './AadhaarFetch'
import CheckInForm from './CheckInForm'

import { getPatientDetails } from '../../../../redux/actions/agent/checkin'

const Index = ({ getPatientDetails, loading, patient }) => {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-8">
              <h1 className="m-0">Consultation</h1>
            </div>{/* /.col */}
            <div className="col-sm-4">
              <AadhaarFetch loading={loading} patient={patient} />
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Info boxes */}
          <div className="row">
            <div className="col-md-12">
              {!loading && patient && <CheckInForm patient={patient} />}
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div>
  )
}

const mapStateToProps = state => ({
  loading: state.checkInReducer.loading,
  patient: state.checkInReducer.patient
})

export default connect(mapStateToProps, { getPatientDetails })(Index)
