import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import setAuthToken from '../../../utils/setAuthToken'
import $ from 'jquery'
import Moment from 'react-moment'

const Checkins = () => {

  const [checkins, setCheckins] = useState([])
  const [checkinsLoading, setCheckinsLoading] = useState(true)

  useEffect(() => {
    setAuthToken(localStorage.agentToken)
    axios.get('/api/agent/checkin/showAll')
      .then(res => {
        $(document).ready(function () {
          $('#checkins-table').DataTable({
            order: []
          });
        });
        setCheckinsLoading(false)
        setCheckins(res.data.checkins)
      })
      .catch(err => {
        const errors = err.response.data.errors;
        errors.forEach(error => {
          toast(error.msg, { type: 'error' })
        })
      })
  }, [])


  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">All Checkins</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Hospital</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Show Checkins</li>
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
              <div className="card card-primary">
                <div className="card-header">
                  <span className="card-title">
                    Check-Ins
                  </span>
                </div>
                <div className="card-body">
                  <table id="checkins-table" className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Check-in time</th>
                        <th>Check-in type</th>
                        <th>Patient Name</th>
                        <th>Referred to</th>
                        <th>Checked in by</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !checkinsLoading && checkins.map(checkin => (
                          <tr key={checkin._id}>
                            <td>
                              <Moment format="dddd, DD/MM/YYYY, HH:mm:ss">{checkin.checkInDateTime}</Moment>
                            </td>
                            <td>
                              <b>{
                                checkin.checkInType.label === "Emergency" ? (<span className="badge badge-danger">Emergency</span>) : (
                                  checkin.checkInType.label === "Admission" ? (
                                    <span className="badge badge-primary">Admission</span>
                                  ) : (<span className="badge badge-warning">Consultation</span>)
                                )
                              }</b>
                            </td>
                            <td>{checkin.patientId.firstname + ' ' + checkin.patientId.lastname}</td>
                            <td>{checkin.medicalUnit.label}</td>
                            <td>{checkin.createdBy.name}</td>
                            <td>{checkin.treatmentStatus === 1 ? (<span className="badge badge-danger">Not Treated</span>) : (checkin.treatmentStatus === 2 ? (<span className="badge badge-warning">Under Treatment</span>) : (<span className="badge badge-success">Treatment Complete</span>))}</td>
                          </tr>
                        ))
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
    </div>
  )
}

export default Checkins
