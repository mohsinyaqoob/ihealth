import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'
import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../../../utils/setAuthToken'

const Index = () => {

  const [agents, setAgents] = useState([])

  useEffect(() => {

    if (localStorage.hospitalToken) {
      setAuthToken(localStorage.hospitalToken)
    }

    axios.get('/api/hospital/data/agents')
      .then(res => {
        $(document).ready(function () {
          $('#agents-table').DataTable();
        });
        setAgents(res.data.agents)
      })
      .catch(err => {
        const errors = err.response.data.errors;
        errors.forEach(error => toast(error.msg, { type: 'error' }))
      })

  }, [])
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">Agents</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Hospital</li>
                <li className="breadcrumb-item">Dashboard</li>
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
                    Hospital Agents
                  </h1>
                  <div className="card-tools">
                    <Link to="/hospital/dashboard/createUser" className="btn btn-primary">
                      Create Agent
                    </Link>
                  </div>
                </div>
                <div className="card-body">
                  <table id="agents-table" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Role</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Hospital</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        agents.map(agent => {
                          return (
                            <tr key={agent._id}>
                              <td>{agent.role.role_name}</td>
                              <td>{agent.name}</td>
                              <td>{agent.username}</td>
                              <td>{agent.status ? <span className="badge badge-success">Active</span> : <span className="badge badge-danger">Inactive</span>}</td>
                              <td>{agent.hospital.name}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}

    </div >

  )
}

export default Index
