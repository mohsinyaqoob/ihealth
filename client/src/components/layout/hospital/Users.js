import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import $ from 'jquery'
import setAuthToken from '../../../utils/setAuthToken'
import { upperCaseFirstLetter } from '../../../utils/TypeTransform'
import { Link } from 'react-router-dom'
const Users = () => {

  const [users, setUsers] = useState([])
  const [statusChange, setStatusChange] = useState(false)
  const [usersLoading, setUsersLoading] = useState(true)

  useEffect(() => {
    if (localStorage.hospitalToken) {
      setAuthToken(localStorage.hospitalToken)
    }
    axios.get('/api/hospital/data/users')
      .then(res => {
        $(document).ready(function () {
          $('#users-table').DataTable();
        });
        setUsers(res.data.users)
        setUsersLoading(false)
      })
      .catch(err => {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach(error => {
            toast(error.msg, { type: 'error' })
          })
          setUsersLoading(false)
        }
      })
  }, [statusChange])

  const changeStatus = async (action, id) => {
    const body = JSON.stringify({ action, user_id: id })
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.put('/api/hospital/data/users', body, config)
      console.log(res.data)
      setStatusChange(statusChange ? false : true)
      toast('Status changed', { type: 'success' })

    } catch (err) {
      toast('Somthing went wrong', { type: 'error' })
    }
  }


  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">Users</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Hospital</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Users</li>
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
              <div className="card">
                <div className="card-header">
                  <h1 className="card-title">
                    Your users
                  </h1>
                  <div className="card-tools">
                    <Link to="/hospital/dashboard/createUser" className="float-right btn btn-primary">Create User</Link>
                  </div>
                </div>
                <div className="card-body">
                  <table id="users-table" className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!usersLoading && users.map(user => {
                        return (
                          <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{upperCaseFirstLetter(user.role.role_name)}</td>
                            <td>{user.username}</td>
                            <td>
                              {user.status ? (<span className="badge badge-success">Active</span>) : (<span className="badge badge-danger">Inactive</span>)}
                            </td>
                            <td>
                              {user.status === 1 ? (<button onClick={() => { changeStatus(0, user._id) }} className="btn btn-danger btn-sm">Disable user</button>) : (<button onClick={() => { changeStatus(1, user._id) }} className="btn btn-primary btn-sm">Enable user</button>)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="card-footer">
                  {/** select all from patients where birthHospitalId = thisHosId*/}
                </div>
              </div>
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div>

  )
}

export default Users


// 5596-0101-9179-7990
// 5590-0101-