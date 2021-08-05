import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'


import { getPatientDetails } from '../../../../redux/actions/agent/checkin'
import { resetPatient } from '../../../../redux/actions/agent/checkin'

const AadhaarFetch = ({ getPatientDetails, resetPatient, loading, patient }) => {

  const [aadhaarNumber, setAadhaarNumber] = useState('123456789099')


  const handleSubmit = e => {
    e.preventDefault()
    getPatientDetails(aadhaarNumber)
  }

  const resetAadhaar = e => {
    // Call action that will clear state
    e.preventDefault()
    resetPatient()
    setAadhaarNumber('')
  }

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-group">
        <div className="mb-3 input-group">
          <input
            onChange={e => setAadhaarNumber(e.target.value)}
            value={aadhaarNumber}
            type="text"
            maxLength="12"
            name="aadhaarNumber"
            id="aadhaar"
            className="form-control"
            placeholder="Enter Patient's Aadhaar Number"
            disabled={!loading && patient && 'disabled'}
          />
          <div className="input-group-append">
            {!loading && patient ? (
              <input onClick={resetAadhaar} type="reset" value="Reset" className="float-right input-group-text btn btn-warning btn-sm" />
            ) : (
              <input type="submit" value="Go" className="float-right input-group-text bg-red btn btn-danger btn-sm" />
            )}
          </div>
        </div>
      </div>
    </form>
  )
}

export default connect(null, { getPatientDetails, resetPatient })(AadhaarFetch)
