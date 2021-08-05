import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../../../../redux/actions/patient/auth'


const Navbar = ({ logout, patient }) => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#!" role="button"><i className="fas fa-bars" /></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#!" className="nav-link">
            Online Consultation
            <span className="ml-1 badge badge-success">
              New
            </span>
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="ml-auto navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#!">
            <i className="mr-2 fas fa-user" />
            {patient.firstname + " " + patient.lastname}
          </a>
        </li>
        <li className="nav-item">
          <a onClick={logout} className="nav-link" data-widget="control-sidebar" data-slide="true" href="#!" role="button">
            <i className="fas fa-window" />
            Sign out
          </a>
        </li>
      </ul>
    </nav>
  )
}

const mapStateToProps = state => (
  {
    patient: state.patientAuth.patient
  }
)

export default connect(mapStateToProps, { logout })(Navbar)
