import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Select from 'react-select'
import { connect } from 'react-redux'
import { login } from '../../../redux/actions/hospital/auth'
import { Redirect } from 'react-router-dom'

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        hospital: {},
        password: ''
    })
    const [hospitals, setHospitals] = useState({})
    const [hospitalsLoading, setHospitalsLoading] = useState(true)


    const handleSubmit = e => {
        e.preventDefault();
        login(formData)
    }
    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get('/api/hospital/data')
            .then(res => {
                if (res.data.hospitals) {
                    let data = res.data.hospitals.map(item => {
                        return { label: item.name, value: item._id };
                    })
                    setHospitals(data)
                    setHospitalsLoading(false)
                }
            })
            .catch(err => console.log("Error: ", err))
    }, [])

    const handleSelectChange = e => {
        setFormData({ ...formData, hospital: { label: e.label, value: e.value } })
    }

    if (isAuthenticated) {
        return <Redirect to="/hospital/dashboard" />
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
                        <h1><b>iHealth</b><span className="text-danger">Hospital</span></h1>
                    </div>
                    <div className="card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="col">
                                <div className="form-group">
                                    <Select
                                        value={formData.hospital}
                                        onChange={handleSelectChange}
                                        options={hospitals}
                                        style={{ padding: '0', margin: '0' }}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <input onChange={handleChange} value={formData.password} type="password" name="password" className="form-control" placeholder="Password" />
                            </div>
                            <div className="row">
                                {/* /.col */}
                                <div className="col-4 pull-right">
                                    <button type="submit" className="btn btn-primary btn-block">Sign In</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </form>
                        <div className="mt-3 mb-3 text-center social-auth-links">
                            <Link to="/patient/register" className="btn btn-block btn-secondary">
                                Dont have an account? Sign up instead.
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
        isAuthenticated: state.hospitalAuthReducer.isAuthenticated
    }
)

export default connect(mapStateToProps, { login })(Login)