import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import AgentAvatar from '../../../../../assets/img/Agent.png'
import axios from 'axios'

const Aside = ({ patient }) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="/patient/dashboard" className="brand-link">
        <i className="px-3 fas fa-hospital"></i>
        <span className="brand-text font-weight-light">
          iHealth Patient
        </span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="pb-3 mt-3 mb-3 user-panel d-flex">
          <div className="image">
            <img src={AgentAvatar} className="img-circle elevation-2" alt="Admin" />
          </div>
          <div className="info">
            <Link to="/patient/dashboard" className="d-block">
              {patient.firstname + " " + patient.lastname}
            </Link>
          </div>
        </div>
        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
            {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
            <li className="nav-item">
              <Link to="/patient/dashboard" className="nav-link">
                <i className="nav-icon fas fa-home" />
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            <li className="nav-header text-bold text-primary">
              PATIENT SERVICES
            </li>
            <li className="nav-item">
              <Link to="/patient/dashboard/checkins" className="nav-link">
                <i className="nav-icon fas fa-users text-red" />
                <p>
                  Checkins
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/patient/dashboard/medicalReports" className="nav-link">
                <i className="nav-icon fas fa-sign-in-alt text-green" />
                <p>
                  Medical Reports
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/patient/dashboard/medicines" className="nav-link">
                <i className="nav-icon fas fa-sign-out-alt text-red" />
                <p>
                  Medicines
                </p>
              </Link>
            </li>
            <li className="nav-header text-bold text-primary">ONLINE <span className="text-danger">(OPD)</span></li>
            <li className="nav-item">
              <Link to="/patient/dashboard/consultation" className="nav-link">
                <i className="nav-icon fas fa-file text-green" />
                <p>
                  Consultation
                  <span className="badge badge-success">
                    new
                  </span>
                </p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside >

  )
}

const mapStateToProps = state => (
  {
    patient: state.patientAuth.patient
  }
)

export default connect(mapStateToProps)(Aside)
