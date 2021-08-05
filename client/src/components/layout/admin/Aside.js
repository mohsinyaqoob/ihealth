import React from 'react'
import { Link } from 'react-router-dom'

const Aside = () => {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to="/admin/dashboard" className="brand-link">
                <img src="/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" />
                <span className="brand-text font-weight-light">Administrator</span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="pb-3 mt-3 mb-3 user-panel d-flex">
                    <div className="image">
                        <img src="/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="Admin" />
                    </div>
                    <div className="info">
                        <Link to="/admin/dashboard" className="d-block">Shariq Khan</Link>
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
                            <Link to="/admin/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-home" />
                                <p>
                                    Dashboard
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/dashboard/agents" className="nav-link">
                                <i className="nav-icon fas fa-users" />
                                <p>
                                    Agents
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/dashboard/test" className="nav-link">
                                <i className="nav-icon fas fa-plus" />
                                <p>
                                    Hospitals
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/dashboard/test" className="nav-link">
                                <i className="nav-icon fas fa-briefcase-medical" />
                                <p>
                                    Doctors
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/dashboard/test" className="nav-link">
                                <i className="nav-icon fas fa-user-nurse" />
                                <p>
                                    Nurses
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/dashboard/test" className="nav-link">
                                <i className="nav-icon fas fa-first-aid" />
                                <p>
                                    Dressers
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/dashboard/test" className="nav-link">
                                <i className="nav-icon fas fa-book-medical" />
                                <p>
                                    Laboratory
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/admin/dashboard/test" className="nav-link">
                                <i className="nav-icon fas fa-ambulance" />
                                <p>
                                    Ambulance
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">
                                <i className="nav-icon far fa-plus-square" />
                                <p>
                                    Extras
      <i className="fas fa-angle-left right" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>
                                            Login &amp; Register v1
          <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/examples/login.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Login v1</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/examples/register.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Register v1</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/examples/forgot-password.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Forgot Password v1</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/examples/recover-password.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Recover Password v1</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>
                                            Login &amp; Register v2
          <i className="fas fa-angle-left right" />
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <a href="pages/examples/login-v2.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Login v2</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/examples/register-v2.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Register v2</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/examples/forgot-password-v2.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Forgot Password v2</p>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="pages/examples/recover-password-v2.html" className="nav-link">
                                                <i className="far fa-circle nav-icon" />
                                                <p>Recover Password v2</p>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/lockscreen.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Lockscreen</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/legacy-user-menu.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Legacy User Menu</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/language-menu.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Language Menu</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/404.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Error 404</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/500.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Error 500</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/pace.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Pace</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="pages/examples/blank.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Blank Page</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="starter.html" className="nav-link">
                                        <i className="far fa-circle nav-icon" />
                                        <p>Starter Page</p>
                                    </a>
                                </li>
                            </ul>
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
