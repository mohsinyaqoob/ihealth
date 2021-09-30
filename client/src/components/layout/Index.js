import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainNav from './MainNav'

import setAuthToken from '../../utils/setAuthToken'

const Index = () => {
    useEffect(() => {
        if (localStorage.patientToken) {
            setAuthToken(localStorage.patientToken)
        }
    }, [])
    return (
        <div style={{backgroundImage:'url("https://images.unsplash.com/photo-1618498082410-b4aa22193b38?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80")', minHeight:'100vh', backgroundSize:'cover', backgroundBlendMode:'lighten'}}>
            <MainNav />
            <section className="mt-5 content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card card-danger">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="mr-2 fas fa-plus"></i>  Patient</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    Use the below button(s) to register or sign in to your account
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <Link className="mr-2 btn btn-primary btn-sm pull-right" to="/patient/register"><i className="mr-2 fas fa-lock"></i>
                                        Register
                                    </Link>
                                    <Link className="btn btn-primary btn-sm pull-right" to="/patient/login"><i className="mr-2 fas fa-lock"></i>
                                        Login
                                    </Link>
                                </div>
                                {/* /.card-footer*/}
                            </div>
                            {/* /.card */}
                        </div>
                        <div className="col-md-4">
                            <div className="card card-success">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="mr-2 fas fa-ambulance"></i>  Hospital</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    Use the below button(s) to register or sign in to your account
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <Link className="btn btn-primary btn-sm pull-right" to="/hospital/login">
                                        <i className="mr-2 fas fa-lock"></i>
                                        Login
                                    </Link>
                                </div>
                                {/* /.card-footer*/}
                            </div>
                            {/* /.card */}
                        </div>
                        <div className="col-md-4">
                            <div className="card card-warning">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="mr-2 fas fa-user"></i>Agent</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    Use the below button(s) to register or sign in to your account
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <Link className="btn btn-primary btn-sm pull-right" to="/agent/login"><i className="mr-2 fas fa-lock"></i>
                                        Login
                                    </Link>
                                </div>
                                {/* /.card-footer*/}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>

                    <div className="mt-4 row">
                        <div className="col-md-4">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="mr-2 fas fa-plus"></i>Doctor</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    Use the below button(s) to register or sign in to your account
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <Link className="btn btn-primary btn-sm pull-right" to="/doctor/login"><i className="mr-2 fas fa-lock"></i>
                                        Login</Link>
                                </div>
                                {/* /.card-footer*/}
                            </div>
                            {/* /.card */}
                        </div>
                        <div className="col-md-4">
                            <div className="card card-secondary">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="mr-2 fas fa-user"></i>Nurse</h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    Use the below button(s) to register or sign in to your account
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <Link className="btn btn-primary btn-sm pull-right" to="/nurse/login"><i className="mr-2 fas fa-lock"></i>
                                        Login</Link>
                                </div>
                                {/* /.card-footer*/}
                            </div>
                            {/* /.card */}
                        </div>
                        <div className="col-md-4">
                            <div className="card card-secondary">
                                <div className="card-header">
                                    <h3 className="card-title"><i className="mr-2 fas fa-user"></i>
                                        Medical Lab
                                    </h3>
                                    <div className="card-tools">
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    Use the below button(s) to register or sign in to your account
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <Link className="btn btn-primary btn-sm pull-right" to="/lab/login"><i className="mr-2 fas fa-lock"></i>
                                        Login
                                    </Link>
                                </div>
                                {/* /.card-footer*/}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>
                </div>
            </section >
        </div>
    )
}

export default Index
