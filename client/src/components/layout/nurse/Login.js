import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { login } from '../../../redux/actions/nurse/auth'

const Login = ({ login, loading, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: 'asmabhat',
    password: 'password'
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    login(formData)
  }

  if (!loading && isAuthenticated) {
    return <Redirect to="/nurse/dashboard" />
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
            <h1><b>iHealth</b><span className="text-danger text-bold">Nurse</span></h1>
          </div>
          <div className="card-body">
            <p className="login-box-msg">Sign in to start your session</p>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="form-group">
                <input
                  onChange={handleChange}
                  value={formData.username}
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Username" />
              </div>
              <div className="form-group">
                <input
                  onChange={handleChange}
                  value={formData.password}
                  type="password" name="password"
                  className="form-control"
                  placeholder="Password" />
              </div>
              <div className="row">
                {/* /.col */}
                <div className="col-4 pull-right">
                  <button type="submit" className="float-right btn btn-primary btn-block">Sign In</button>
                </div>
                {/* /.col */}
              </div>
            </form>
            <div className="mt-3 mb-3 text-center social-auth-links">
              <Link to="/patient/register" className="btn btn-block btn-secondary">
                Issue signing in. Contact admin.
              </Link>
            </div>
          </div>
          {/* /.card-body */}
        </div>
        {/* /.card */}
      </div>
    </div>

  )
}

const mapStateToProps = state => (
  {
    loading: state.nurseAuthReducer.loading,
    isAuthenticated: state.nurseAuthReducer.isAuthenticated
  }
)

export default connect(mapStateToProps, { login })(Login)
