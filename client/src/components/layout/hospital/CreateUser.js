import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Select from 'react-select'

import setAuthToken from '../../../utils/setAuthToken'


const CreateUser = props => {

  const [formData, setFormData] = useState({
    roles: [],
    role: '',
    name: '',
    username: '',
    password1: '',
    password2: ''
  })

  useEffect(() => {
    if (localStorage.hospitalToken) {
      setAuthToken(localStorage.hospitalToken)
    }
    axios.get('/api/hospital/data/userRoles')
      .then(res => setFormData({ ...formData, roles: res.data.roles }))
      .catch(err => console.log(err))
  }, [])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (formData.password1 !== formData.password2) {
      return toast('Passwords do not match', { type: 'error' })
    }
    if (formData.role == 0) {
      return toast('Select a User Role', { type: 'error' })
    }
    const { role, name, username, password1 } = formData;
    const body = JSON.stringify({ role, name, username, password: password1 })
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/hospital/users/createUser', body, config);
      console.log(res.data)
      toast(res.data.msg, { type: 'success' })
      setFormData({ ...formData, role: 0, name: '', username: '', password1: '', password2: '' })
      props.history.push('/hospital/dashboard/users');
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => toast(error.msg, { type: 'error' }))
      }
    }
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">Create User</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Hospital</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Create User</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Info boxes */}
          <div className="row">
            <div className="col-md-12">
              {/* general form elements */}
              <div className="card card-primary">
                <div className="card-header">
                  <h3 className="card-title">Create a new user</h3>
                </div>
                {/* /.card-header */}
                {/* form start */}
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <div className="card-body">
                    <div className="form-group">
                      <label>User Role</label>
                      <select onChange={handleChange} name="role" className="form-control" value={formData.role}>
                        <option value="0">SELECT USER ROLE</option>
                        {formData.roles.map(role => {
                          return <option key={role._id} value={role._id}>{role.role_name.toUpperCase()}</option>
                        })}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Name</label>
                      <input onChange={handleChange} value={formData.name} type="text" name="name" className="form-control" placeholder="Name" />
                    </div>
                    <div className="form-group">
                      <label>Username</label>
                      <input onChange={handleChange} value={formData.username} type="text" name="username" className="form-control" placeholder="Username" />
                    </div>
                    <div className="form-group">
                      <label>Passwords</label>
                      <input onChange={handleChange} value={formData.password1} type="password" name="password1" className="form-control" placeholder="Username" />
                    </div>
                    <div className="form-group">
                      <label>Confirm Password</label>
                      <input onChange={handleChange} value={formData.password2} type="password" name="password2" className="form-control" placeholder="Username" />
                    </div>
                  </div>
                  {/* /.card-body */}
                  <div className="card-footer">
                    <input type="submit" className="btn btn-primary" value="Submit" />
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}

    </div >

  )
}

export default CreateUser
