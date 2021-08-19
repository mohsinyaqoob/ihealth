import React, { useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { toast } from 'react-toastify'

import setAuthToken from '../../../../utils/setAuthToken'
import PatientDetails from './PatientDetails'

const ImageInvestigation = () => {

  const [aadhaarNumber, setAadhaarNumber] = useState("123412341234")
  const [patient, setPatient] = useState({})
  const [patientFetched, setPatientFetched] = useState(false)

  const handleChange = e => {
    setAadhaarNumber(e.target.value)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setAuthToken(localStorage.labAuthToken)
    try {
      const res = await axios.get(`/api/lab/data/patient?aadhaarNumber=${aadhaarNumber}`)
      setPatient(res.data.patient)
      setPatientFetched(true)
    } catch (err) {
      const errors = err.response.data.errors;
      errors.forEach(error => toast(error.msg, { type: 'error' }))
    }
  }

  const reset = () => {
    setPatientFetched(false)
    setAadhaarNumber("")
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-8">
              <h1 className="m-0">Image Investigation</h1>
            </div>{/* /.col */}
            <div className="col-sm-4">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="mb-3 input-group">
                    <input
                      onChange={handleChange}
                      value={aadhaarNumber}
                      type="text"
                      maxLength="12"
                      name="aadhaarNumber"
                      id="aadhaar"
                      className="form-control"
                      placeholder="Enter Patient's Aadhaar Number"
                    />
                    <div className="input-group-append">
                      {!patientFetched ? (<input type="submit" value="Go" className="float-right input-group-text bg-red btn btn-warning btn-sm" />) : (<button onClick={reset} className="float-right input-group-text btn btn-warning btn-sm">Reset</button>)}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              {patientFetched && patient && (<PatientDetails patient={patient} />)}
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}


export default ImageInvestigation
