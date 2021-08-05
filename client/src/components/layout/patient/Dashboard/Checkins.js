import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import Moment from 'react-moment'

const Checkins = () => {

  const [checkins, setCheckins] = useState([])

  useEffect(() => {
    axios.get('/api/patient/data/checkins')
      .then(res => setCheckins(res.data.checkins))
      .catch(err => toast(err.message, { type: 'error' }))
  }, [])



  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">Checkins</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Patient</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Checkins</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h1 className="card-title">
                    Your Health Checkins
                  </h1>
                </div>
                <div className="p-0 card-body">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Checkin Date</th>
                        <th>Health Centre</th>
                        <th>Complaints</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        checkins && checkins.map(checkin => (
                          <tr>
                            <td>
                              <Moment format="d MMM yyyy">
                                {checkin.checkInDateTime}
                              </Moment>
                            </td>
                            <td>{checkin.hospital.name}</td>
                            <td>
                              {
                                checkin.complaints.map((complaint, index) => (
                                  <span key={index} className="p-1 mr-1 text-bold text-red bg-red">
                                    #{complaint}
                                  </span>
                                ))
                              }
                            </td>
                            <td>
                              <button className="btn btn-danger btn-sm">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot></tfoot>
                  </table>
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

export default Checkins
