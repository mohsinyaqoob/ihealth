import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../../../redux/actions/patient/auth'

const Login = ({ login, loading, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    aadhaarNumber: '123456789011',
    password: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    login(formData)
  }

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!loading && isAuthenticated) {
    return <Redirect to="/patient/dashboard" />
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <Link to="/" className="mb-3 btn btn-primary btn-sm">
          <i className="mr-1 fas fa-home"></i>
          Back Home
        </Link>
        {/* /.login-logo */}
        <div className="card card-outline card-primary">
          <div className="text-center card-header">
            <Link to="/patient/login" className="h1">
              <b>iHealth</b>
              <span className="text-red">Patient</span>
            </Link>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <div className="mb-3 input-group">
                <input value={formData.aadhaarNumber} onChange={handleChange} type="text" name="aadhaarNumber" minLength="12" maxLength="12" className="form-control" placeholder="Aadhaar Number" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-at" />
                  </div>
                </div>
              </div>
              <div className="mb-3 input-group">
                <input value={formData.password} onChange={handleChange} type="password" name="password" className="form-control" placeholder="Password" />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock" />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col">
                    <button type="submit" className="float-right btn btn-primary">
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </div>

  )
}

const mapStateToProps = state => ({
  loading: state.patientAuth.loading,
  isAuthenticated: state.patientAuth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
