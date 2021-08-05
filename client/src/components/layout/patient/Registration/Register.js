import React from 'react'
import { Redirect, Link } from 'react-router-dom'

import AadhaarForm from './AadhaarForm'
import OTPForm from './OTPForm'
import PatientForm from './PatientForm'

import { connect } from 'react-redux'

const Register = ({ aadhaarValid, loading, phone, aadhaarNumber, registrationToken, loading2, isAuthenticated }) => {

  if (!loading2 && isAuthenticated) {
    return <Redirect to="/patient/dashboard" />
  }


  return (
    <div className="login-page">
      <div className="login-box">
        <Link to="/" className="mb-3 btn btn-primary btn-sm">
          <i className="mr-1 fas fa-home"></i>
          Back Home
        </Link>
        {!loading && registrationToken !== '' ? (<PatientForm />) : (
          <>
            <AadhaarForm />
            {!loading && aadhaarValid && <OTPForm />}
          </>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  aadhaarValid: state.patientRegister.aadhaarValid,
  loading: state.patientRegister.loading,
  registrationToken: state.patientRegister.registrationToken,
  loading2: state.patientAuth.loading,
  isAuthenticated: state.patientAuth.isAuthenticated
})

export default connect(mapStateToProps)(Register)
