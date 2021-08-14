import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
    if (localStorage.nurseAuthToken) {
      setAuthToken(localStorage.nurseAuthToken)
    }

    axios.get('/api/nurse/data/checkins?checkInType=emergency')
      .then(res => {
        $(document).ready(function () {
          $('#emergencyCheckins').DataTable({
            order: [],
            "bDestroy": true
          });
        });
        setCheckins(res.data.checkins)
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

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              <h1 className="m-0">Emergency Care</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Nurse</li>
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
          {/* Info boxes */}
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h1 className="card-title">
                    Emergency Care Unit
                  </h1>
                  <div className="card-tools">
                    <button onClick={handleReload} className="btn btn-sm btn-primary">
                      Get Updated List
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <table id="emergencyCheckins" className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Check-in Time</th>
                        <th>Patient Name</th>
                        <th>Aadhaar</th>
                        <th>Referred to</th>
                        <th>Status</th>
                        <th className="w-20">Action</th>
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
                            <td className="text-center">
                              <Link to={`/nurse/dashboard/treatment/${checkin._id}`} className="btn btn-sm btn-warning">Treatment</Link>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
                <div className="card-footer"></div>
              </div>

            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div>
  )
}

export default Index
