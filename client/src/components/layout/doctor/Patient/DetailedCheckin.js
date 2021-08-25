import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'

import PatientDetails from './PatientDetails'
import setAuthToken from '../../../../utils/setAuthToken'

const DetailedCheckin = (props) => {

  const [checkinDetails, setCheckinDetails] = useState({})
  const [loading, setLoading] = useState(true)

  const checkinId = props.match.params.checkinId

  useEffect(() => {
    setAuthToken(localStorage.doctorToken)
    axios.get(`/api/doctor/data/detailedCheckin?checkinId=${checkinId}`)
      .then(res => {
        setCheckinDetails(res.data.detailedCheckin)
        setLoading(false)
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
              <h1 className="m-0"></h1>
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
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          {/* Info boxes */}
          <div className="row">
            <div className="col-md-12">
              <div className="card card-success">
                <div className="card-header">
                  <h1 className="card-title">
                    <Link to={`/doctor/dashboard/continueTreatment/${checkinId}`}>
                      <i className="mr-1 fas fa-home"></i>
                    </Link>
                    Patient Info
                  </h1>
                  <div className="card-tools">
                    <Link className="bg-white btn btn-sm" to={`/doctor/export/${checkinId}`}>Export Health Card</Link>
                  </div>
                </div>
                <div className=" card-body">
                  <table className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Checkin Time</th>
                        <th>Checkin Type</th>
                        <th>Patient</th>
                        <th>Complaints</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loading && checkinDetails ?
                        (<tr>
                          <td style={{ width: '15%' }}>
                            <Moment format="DD MMM YY, HH:mm">
                              {checkinDetails.checkin.checkInDateTime}
                            </Moment>
                          </td>
                          <td style={{ width: '15%' }}>
                            {checkinDetails.checkin.checkInType.label}
                          </td>
                          <td style={{ width: '20%' }}>
                            {checkinDetails.checkin.patientId.firstname + " " + checkinDetails.checkin.patientId.lastname}
                          </td>
                          <td style={{ width: '50%' }}>
                            {checkinDetails.checkin.complaints.map((cmp, index) => (
                              <span key={index} className="p-1 mr-1 bg-red">
                                {cmp}
                              </span>
                            ))}
                          </td>
                        </tr>
                        ) : ""}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h1 className="card-title">
                    Patient Vitals
                  </h1>
                </div>
                <div className=" card-body">
                  <table className="table table-striped table-bordered hover">
                    <thead>
                      <tr>
                        <th>SPO2</th>
                        <th>BPS</th>
                        <th>BPD</th>
                        <th>BS</th>
                        <th>PUL</th>
                        <th>TEMP</th>
                        <th>Record Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !loading && checkinDetails ? (
                          checkinDetails.vitals.map((vital, index) => (
                            <tr key={index}>
                              <td>{vital.spo2}</td>
                              <td>{vital.systole}</td>
                              <td>{vital.diastole}</td>
                              <td>{vital.bloodsugar}</td>
                              <td>{vital.pulse}</td>
                              <td>{vital.bodytemp}</td>
                              <td>
                                <Moment format="DD MMM YY, HH:mm">
                                  {vital.recordedAt}
                                </Moment>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6">No vitals recorded...</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card card-danger">
                <div className="card-header">
                  <h1 className="card-title">
                    Medical Reports
                  </h1>
                </div>
                <div className=" card-body">
                  <table className="table table-striped table-bordered hover">
                    <thead>
                      <tr>
                        <th style={{ width: '20%' }}>Date</th>
                        <th style={{ width: '50%' }}>Name</th>
                        <th style={{ width: '20%' }}>Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !loading && checkinDetails ? (
                          checkinDetails.testReports.map((test, index) => (
                            <tr key={index}>
                              <td>
                                <Moment format="DD MMM YY, HH:mm">
                                  {test.assignedDate}
                                </Moment>
                              </td>
                              <td>{test.assignedTest.test_name}</td>
                              <td>
                                <a href={test.report} target="blank" className="btn btn-success btn-sm">
                                  View
                                </a>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">No medical reports found...</td>
                          </tr>
                        )
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card card-primary">
                <div className="card-header">
                  <h1 className="card-title">
                    Diagnosis
                  </h1>
                </div>
                <div className=" card-body">
                  <table className="table table-bordered table-striped hover">
                    <thead>
                      <tr>
                        <th style={{ width: '20%' }}>Date</th>
                        <th style={{ width: '40%' }}>Disease</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !loading && checkinDetails ? (checkinDetails.diagnosis.map((disease, index) => (
                          <tr>
                            <td>{
                              <Moment format="DD MMM YY, HH:mm">
                                {disease.diagnosisDate}
                              </Moment>}</td>
                            <td>
                              {
                                disease.otherDisease ? (disease.otherDisease) : (
                                  `${disease.disease.name} / ${disease.disease.abbr}`
                                )
                              }
                            </td>
                          </tr>
                        ))) : "Not Loaded"
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="card card-danger">
                <div className="card-header">
                  <h1 className="card-title">
                    Medications / Drugs
                  </h1>
                </div>
                <div className=" card-body">
                  <table className="table table-bordered table-striped hover">
                    <thead>
                      <tr>
                        <th style={{ width: '50%' }}>Medication</th>
                        <th style={{ width: '20%' }}>Start Date</th>
                        <th style={{ width: '20%' }}>End Date</th>
                        <th style={{ width: '10%' }}>Schedule</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        !loading && checkinDetails ? (checkinDetails.medications.map((med, index) => (
                          <tr key={index}>
                            <td>{med.drug.drug_name}</td>
                            <td>
                              <Moment format="DD MMM YY">
                                {med.startDate}
                              </Moment>
                            </td>
                            <td>
                              <Moment format="DD MMM YY">
                                {med.endDate}
                              </Moment>
                            </td>
                            <td>{med.schedule.toUpperCase()}</td>
                          </tr>
                        ))) : "Not Loaded"
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* /.content */}
    </div>

  )
}

export default DetailedCheckin
