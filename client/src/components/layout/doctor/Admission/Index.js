import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Moment from 'react-moment'
import $ from 'jquery'

import setAuthToken from '../../../../utils/setAuthToken'

const Index = () => {

  const [Checkins, setCheckins] = useState([])
  const [loading, setLoading] = useState(true)
  const [reload, setReload] = useState(true)

  useEffect(() => {
    $("#emergencyCheckins").dataTable().fnDestroy();
    if (localStorage.doctorToken) {
      setAuthToken(localStorage.doctorToken)
    }

    axios.get('/api/doctor/data/checkins?checkInType=admission')
      .then(res => {
        $(document).ready(function () {
          $('#emergencyCheckins').DataTable({
            order: [],
            "bDestroy": true
          });
        });
        setCheckins(res.data.checkIns)
        setLoading(false)
      })
      .catch(err => {
        console.log(err.message)
        toast('Could not fetch checkin', { type: 'error' })
        setLoading(false)
      })

  }, [reload])

  const handleReload = () => {
    const val = reload ? false : true;
    setReload(val)
  }

  // return <h1>Hello</h1>

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">Emergency</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Doctor</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Emergency</li>
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
              <div className="card">
                <div className="card-header">
                  <h1 className="card-title text-bold">
                    Checkins
                  </h1>
                  <div className="card-tools">
                    <button onClick={handleReload} className="btn btn-primary btn-sm">
                      Reload
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <table id="emergencyCheckins" className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Check-in Time</th>
                        <th>Patient Name</th>
                        <th>Aadhaar</th>
                        <th>Referred to</th>
                        <th>Status</th>
                        <th className="w-20">Treatment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !loading && Checkins.map(checkin => (
                          <tr key={checkin._id}>
                            <td>
                              <Moment
                                format="ddd, DD/MM/YY, HH:mm A"
                              >{checkin.checkInDateTime}</Moment>
                            </td>
                            <td>{`
                              ${checkin.patientId.firstname} ${checkin.patientId.lastname}
                            `}</td>
                            <td>{checkin.patientId.aadhaarNumber}</td>
                            <td>{checkin.medicalUnit.label}</td>
                            <td>
                              {
                                checkin.treatmentStatus === 1 ? (
                                  <span className="badge badge-danger">Not Treated</span>
                                ) : (<span className="badge badge-warning">Under Treatment</span>)
                              }
                            </td>
                            <td>
                              {
                                checkin.treatmentStatus === 1 ? (
                                  <Link to={`/doctor/dashboard/startTreatment/${checkin._id}`} className="btn btn-sm btn-primary">Initiate</Link>
                                ) : (<Link to={`/doctor/dashboard/continueTreatment/${checkin._id}`} className="btn btn-sm btn-warning">Continue</Link>)
                              }
                            </td>
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
    </div >
  )
}

export default Index
