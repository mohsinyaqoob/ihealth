import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import Select from 'react-select'

import { registerPatient } from '../../../../redux/actions/patient/register'

const PatientForm = ({ aadhaarNumber, registerPatient, isAuthenticated, loading, registrationToken }) => {

  const [formData, setFormData] = useState({
    password1: '',
    password2: '',
    hospital: {}
  })

  const [hospitals, setHospitals] = useState([])

  useEffect(() => {
    axios.get('/api/patient/register/hospitals')
      .then(res => setHospitals(res.data.formattedHospitals))
      .catch(err => toast('Could not fetch hospitals. Try again'), { type: 'error' })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()

    if (formData.password1 !== formData.password2) {
      return toast('Passwords do not match.', { type: 'error' })
    }

    if (formData.password1.length === 0) {
      return toast('Plese write a password.', { type: 'error' })
    }

    // Call registerPatient action
    registerPatient({ password: formData.password1, birthHospital: formData.hospital.value, registrationToken })
  }

  const handleSelectChange = (e) => {
    setFormData({ ...formData, hospital: e })
  };

  //Return if authenticated
  if (!loading && isAuthenticated) {
    return <Redirect to="/patient/dashboard" />
  }


  return (
    <div className="card card-outline card-primary">
      <div className="text-center card-header">
        <Link to="/patient/login" className="h1">
          <b>iHealth</b>
          <span className="text-red">Patient</span>
        </Link>
        <p className="mt-2">
          Sign up with your credentials
        </p>
      </div>
      <div className="card-body">
        <p className="login-box-msg text-gray">
          Create your account below
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <input value={aadhaarNumber} disabled="disabled" type="text" name="aadhaarNumber" className="form-control" placeholder="Aadhaar Number" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-at" />
              </div>
            </div>
          </div>
          <div className="mb-3 input-group">
            <input onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} type="password" name="password1" className="form-control" placeholder="Password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <div className="mb-3 input-group">
            <input onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }} type="password" name="password2" className="form-control" placeholder="Confirm Password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-lock" />
              </div>
            </div>
          </div>
          <hr className="mt-4 mb-4" />
          <div className="mb-3 form-group">
            <label htmlFor="hospital" className="text-gray">
              Select Birth Hospital
            </label>
            <Select
              options={hospitals}
              onChange={handleSelectChange}
            />
          </div>
          <div className="mt-3 form-group">
            <div className="mt-3 row">
              <div className="col">
                <button type="submit" className="float-right btn btn-primary">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* /.card-body */}
    </div>
  )
}

const mapStateToProps = state => ({
  aadhaarNumber: state.patientRegister.aadhaarNumber,
  isAuthenticated: state.patientAuth.isAuthenticated,
  loading: state.patientAuth.loading,
  registrationToken: state.patientRegister.registrationToken
})


export default connect(mapStateToProps, { registerPatient })(PatientForm)
