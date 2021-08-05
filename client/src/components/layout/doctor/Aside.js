import React from 'react'
import { Link } from 'react-router-dom'

import DoctorAvatar from '../../../assets/img/Doctor.jpg'

const Aside = ({ loading, doctor }) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4 custom-range-*">
      {/* Brand Logo */}
      <Link to="/doctor/dashboard" className="brand-link">
        <i className="px-3 fas fa-stethoscope"></i>
        <span className="brand-text font-weight-light">
          Doctor
        </span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="pb-3 mt-3 mb-3 user-panel d-flex">
          <div className="image">
            <img src={DoctorAvatar} className="img-circle elevation-2" alt="Admin" />
          </div>
          <div className="info">
            <Link to="/doctor/dashboard" className="d-block">
              {!loading && doctor && doctor.name}
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
              <Link to="/doctor/dashboard" className="nav-link">
                <i className="nav-icon fas fa-home" />
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            <li className="nav-header text-bold text-primary"><span className="text-danger">START TREATMENT</span>
            </li>
            <li className="nav-item">
              <Link to="/doctor/dashboard/emergency" className="nav-link">
                <i className="nav-icon fas fa-users text-red" />
                <p>
                  Emergency
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/doctor/dashboard/admission" className="nav-link">
                <i className="nav-icon fas fa-sign-in-alt text-green" />
                <p>
                  Admission
                </p>
              </Link>
            </li>
            <li className="nav-header text-bold text-primary">OUT-PATIENT <span className="text-danger">(OPD)</span></li>
            <li className="nav-item">
              <Link to="/doctor/dashboard/consultation" className="nav-link">
                <i className="nav-icon fas fa-file text-green" />
                <p>
                  Consultation
                </p>
              </Link>
            </li>
            <li className="nav-header text-bold">REPORTS</li>
            <li className="nav-item">
              <Link to="/doctor/dashboard/checkins" className="nav-link">
                <i className="fas fa-check nav-icon text-success"></i>
                <p>Medical Reports</p>
              </Link>
            </li>
          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  )
}

export default Aside
