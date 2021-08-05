import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { validateAadhaar, resetAadhaarForm } from '../../../../redux/actions/patient/register'

const AadhaarForm = ({ validateAadhaar, resetAadhaarForm, aadhaarValid, loading }) => {

  const [aadhaarNumber, setAadhaarNumber] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    // Call validateAadhaar Action
    validateAadhaar(aadhaarNumber)
  }

  const handleChange = e => {
    setAadhaarNumber(e.target.value)
  }

  const resetForm = () => {
    setAadhaarNumber('')
    resetAadhaarForm()
  }

  return (
    <div className="card card-outline card-primary">
      <div className="text-center card-header">
        <Link to="/patient/register" className="h1">
          <b>iHealth</b>
          <span className="text-red">Patient</span>
        </Link>
        <p className="mt-2 text-gray">
          Aadhaar Number Verification
        </p>
      </div>
      <div className="card-body">
        <p className="login-box-msg">Enter your Aadhaar Number</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3 input-group">
            <input onChange={handleChange} value={aadhaarNumber} type="text" minLength="12" maxLength="12" name="aadhaarNumber" className="form-control" placeholder="Aadhaar Number" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-at" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                {!loading && aadhaarValid ? (
                  <span
                    type="reset"
                    className="float-right btn btn-warning"
                    onClick={resetForm}
                  >
                    Reset
                  </span>
                ) : (
                  <button
                    type="submit"
                    className="float-right btn btn-primary">
                    Proceed
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* /.card-body */}
    </div>
  )
}

const mapStateToProps = state => (
  {
    aadhaarValid: state.patientRegister.aadhaarValid,
    loading: state.patientRegister.loading
  }
)

export default connect(mapStateToProps, { validateAadhaar, resetAadhaarForm })(AadhaarForm)
