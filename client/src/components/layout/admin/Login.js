import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { login } from '../../../redux/actions/admin/auth'


const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        username: 'sharik@admin',
        password: 'password'
    });


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
    }

    if (isAuthenticated) {
        return <Redirect to="/admin/dashboard" />
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
                        <h1><b>iHealth</b>Admin</h1>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="mb-3 input-group">
                                <input onChange={handleChange} type="text" className="form-control" name="username" placeholder="Username" value={formData.username} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-user" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 input-group">
                                <input onChange={handleChange} type="password" name="password" className="form-control" placeholder="Password" value={formData.password} />
                                <div className="input-group-append">
                                    <div className="input-group-text">
                                        <span className="fas fa-lock" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                    </label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        <div className="mt-2 mb-3 text-center social-auth-links">
                            <a href="#!" className="btn btn-block btn-secondary">
                                Trouble logging in?
                            </a>
                        </div>
                    </div>
                    {/* /.card-body */}
                </div>
                {/* /.card */}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps, { login })(Login)
