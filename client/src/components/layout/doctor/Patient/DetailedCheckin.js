import axios from 'axios'
import React, { useState, useEffect } from 'react'
import PatientDetails from './PatientDetails'

import Moment from 'react-moment'

const DetailedCheckin = props => {
  const checkinId = props.match.params.checkinId

  const [checkinDetails, setCheckinDetails] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`/api/doctor/data/detailedCheckin?checkinId=${checkinId}`)
      .then(res => {
        console.log(res.data)
        setCheckinDetails(res.data.detailedCheckin)
        setLoading(false)
      })
      .catch(err => {
        console.log(err.message)
        setLoading(false)
      })
  }, [])





  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              {/* <h1 className="m-0">{props.match.params.patientId}</h1> */}
              <span className="p-2 m-0 h4">
                Detailed Checkin
              </span>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Doctor</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Detailed Checkin</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <PatientDetails checkinId={checkinId} />
          </div>
        </div>

        {/* Patient Complaints */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-danger">
              <div className="card-header">
                <h1 className="card-title">
                  Patient Complaints
                </h1>
              </div>
              <div className="card-body">
                <span className="p-2 mr-1 badge badge-primary">
                  #Vomit
                </span>
                <span className="p-2 badge badge-primary">
                  #Fever
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Vitals */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-success">
              <div className="card-header">
                <h1 className="card-title">
                  Patient Vitals
                </h1>
              </div>
              <div className="card-body">
                <div className="list-group">
                  <div>
                    <a href="#!" className="list-group-item list-group-item-action">
                      <i className="mr-2 fas fa-pen"></i>
                      <span>
                        SPO2: 90 | BPS: 120 | BPD: 80 | BS: 97 | PUL: 89 | TMP: 101
                      </span>
                      <span className="float-right text-bold">
                        <Moment format="DD MMM YY - HH:mm">
                          {new Date()}
                        </Moment>
                      </span>
                      {/* Add date time to vitals collection */}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Medical tests */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-warning">
              <div className="card-header">
                <h1 className="card-title">
                  Medical Tests
                </h1>
              </div>
              <div className="card-body">
                <div className="list-group">
                  <div>
                    <a href="#!" className="list-group-item list-group-item-action">
                      <i className="mr-2 fas fa-medkit"></i>
                      <span className="p-1 mr-2 text-bold bg-red">
                        CBC - Blood Test
                      </span>
                      reported at
                      <span className="ml-2 text-gray">
                        <Moment format="DD MMM YYYY">{new Date()}</Moment>
                      </span>
                      <span className="float-right">
                        <button className="btn btn-primary btn-sm">
                          View Report
                        </button>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Diagnosis */}
        <div className="row">
          <div className="col-md-12">
            <div className="card card-warning">
              <div className="card-header">
                <h1 className="card-title">
                  Medical Tests
                </h1>
              </div>
              <div className="card-body">
                <div className="list-group">
                  <div>
                    <a href="#!" className="list-group-item list-group-item-action">
                      <i className="mr-2 fas fa-medkit"></i>
                      <span className="p-1 mr-2 text-bold bg-red">
                        CBC - Blood Test
                      </span>
                      reported at
                      <span className="ml-2 text-gray">
                        <Moment format="DD MMM YYYY">{new Date()}</Moment>
                      </span>
                      <span className="float-right">
                        <button className="btn btn-primary btn-sm">
                          View Report
                        </button>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default DetailedCheckin
