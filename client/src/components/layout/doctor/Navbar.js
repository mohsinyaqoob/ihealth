import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../../redux/actions/doctor/auth'

const Navbar = ({ loading, doctor, logout }) => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#!" role="button"><i className="fas fa-bars" /></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#!" className="nav-link">
            <i className="mr-2 fas fa-hospital"></i>
            {!loading && doctor && doctor.hospital.name}
          </a>
        </li>
      </ul>
      {/* Right navbar links */}
      <ul className="ml-auto navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="#!">
            <i className="mr-2 fas fa-user" />
            {!loading && doctor && doctor.name}
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

export default connect(null, { logout })(Navbar)
