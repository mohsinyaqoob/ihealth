import React from 'react'
import { Link } from 'react-router-dom'
import LabImage from '../../../assets/img/Lab.jpg'

const Aside = ({ loading, lab }) => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <Link to="/lab/dashboard" className="brand-link">
        <i className="px-3 fas fa-hospital"></i>
        <span className="brand-text font-weight-light">
          Laboratory
        </span>
      </Link>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="pb-3 mt-3 mb-3 user-panel d-flex">
          <div className="image">
            <img src={LabImage} className="img-circle elevation-2" alt="Admin" />
          </div>
          <div className="info">
            <Link to="/lab/dashboard" className="d-block">
              {!loading && lab.hospital && lab.hospital.name}
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
              <Link to="/lab/dashboard" className="nav-link">
                <i className="nav-icon fas fa-home" />
                <p>
                  Dashboard
                </p>
              </Link>
            </li>
            <li className="nav-header text-bold text-danger">LABORATORY</li>
            <li className="nav-item">
              <Link title="Admission and Discharge agents" to="/lab/dashboard/bodyFluidInvestigation" className="nav-link">
                <i className="nav-icon fas fa-flask" />
                <p>
                  Blood / Serum / Fluid
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lab/dashboard/imageInvestigation" className="nav-link">
                <i className="nav-icon fas fa-camera" />
                <p>
                  Imaging
                </p>
              </Link>
            </li>
            <li className="nav-header text-bold text-primary">VIEW</li>
            <li className="nav-item">
              <Link to="/lab/dashboard/users" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>
                  Reports
                </p>
              </Link>
            </li>

            <li className="nav-header">LIFE EVENTS</li>
            <li className="nav-item">
              <Link to="/lab/dashboard/birthVerifications" className="nav-link">
                <i className="fas fa-check nav-icon text-success"></i>
                <p>Birth Verifications</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lab/dashboard/createBirthEvent" className="nav-link">
                <i className="fas fa-baby nav-icon text-success"></i>
                <p>Create Birth Event</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lab/dashboard/createDeathEvent" className="nav-link">
                <i className="fas fa-skull nav-icon text-danger"></i>
                <p>Create Death Event</p>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/lab/dashboard/lifeEvents" className="nav-link">
                <i className="fas fa-copy nav-icon text-warning"></i>
                <p>View Events</p>
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
