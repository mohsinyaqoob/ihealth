import React from 'react'
import { Link } from 'react-router-dom'
import HospitalImage from '../../../assets/img/hospital.png'

const Aside = ({ loading, hospitalName }) => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to="/hospital/dashboard" className="brand-link">
                <i className="px-3 fas fa-hospital"></i>
                <span className="brand-text font-weight-light">
                    Health Centre
                </span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="pb-3 mt-3 mb-3 user-panel d-flex">
                    <div className="image">
                        <img src={HospitalImage} className="img-circle elevation-2" alt="Admin" />
                    </div>
                    <div className="info">
                        <Link to="/hospital/dashboard" className="d-block">
                            {!loading && hospitalName}
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
                            <Link to="/hospital/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-home" />
                                <p>
                                    Dashboard
                                </p>
                            </Link>
                        </li>
                        <li className="nav-header text-bold text-primary">CREATE</li>
                        <li className="nav-item">
                            <Link title="Admission and Discharge agents" to="/hospital/dashboard/agents" className="nav-link">
                                <i className="nav-icon fas fa-users" />
                                <p>
                                    Agents
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/doctors" className="nav-link">
                                <i className="nav-icon fas fa-plus" />
                                <p>
                                    Doctors
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/nurses" className="nav-link">
                                <i className="nav-icon fas fa-briefcase-medical" />
                                <p>
                                    Nurses
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/labs" className="nav-link">
                                <i className="nav-icon fas fa-book-medical" />
                                <p>
                                    Medical Labs
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/ambulance" className="nav-link">
                                <i className="nav-icon fas fa-ambulance" />
                                <p>
                                    Ambulance
                                </p>
                            </Link>
                        </li>
                        <li className="nav-header text-bold text-primary">VIEW</li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/users" className="nav-link">
                                <i className="nav-icon fas fa-users" />
                                <p>
                                    Users
                                </p>
                            </Link>
                        </li>

                        <li className="nav-header">LIFE EVENTS</li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/birthVerifications" className="nav-link">
                                <i className="fas fa-check nav-icon text-success"></i>
                                <p>Birth Verifications</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/createBirthEvent" className="nav-link">
                                <i className="fas fa-baby nav-icon text-success"></i>
                                <p>Create Birth Event</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/createDeathEvent" className="nav-link">
                                <i className="fas fa-skull nav-icon text-danger"></i>
                                <p>Create Death Event</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hospital/dashboard/lifeEvents" className="nav-link">
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
