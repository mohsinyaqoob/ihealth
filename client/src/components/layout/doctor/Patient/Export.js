import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import setAuthToken from '../../../../utils/setAuthToken'

import Logo from '../../../../assets/img/Logo.png'

const Export = props => {

  const [checkinDetails, setCheckinDetails] = useState({})
  const [loading, setLoading] = useState(true)

  const checkinId = props.match.params.checkinId
  useEffect(() => {

    document.title = `iHealth Patient Card - ${checkinId}`

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

    return document.title = "iHealth"
  }, [])
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="float-right mt-5">
            <Link id="closeExport" to={`/doctor/dashboard/continueTreatment/${checkinId}`} className="btn btn-sm btn-danger">
              Close
            </Link>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="p-0 mx-auto mt-5 text-center col-md-8">
          <img src={Logo} alt="iHealth" className="" width={200} ></img>
          <p>
            Electronic Health Record System based on 12 digit Aadhaar Number
          </p>
          <p>PDF file generated on {new Date().toString()}</p>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="card-outline card-danger card">
              <div className="card-header">
                <h1 className="card-title">
                  <Link to={`/doctor/dashboard/continueTreatment/${checkinId}`}>
                    <i className="mr-1 fas fa-home"></i>
                  </Link>
                  Patient Info
                </h1>
                <div className="card-tools">
                  <a href="#!" className="btn btn-danger btn-sm" onClick={window.print} >Print</a>
                </div>
              </div>
              <div className="p-0 card-body">
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
                            <small key={index} className="p-1 mr-1 bg-red">
                              #{cmp}
                            </small>
                          ))}
                        </td>
                      </tr>
                      ) : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-4 col-md-12">
            <div className="card-outline card-danger card">
              <div className="card-header">
                <h1 className="card-title">
                  Patient Vitals
                </h1>
              </div>
              <div className="p-0 card-body">
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
          <div className="mt-4 col-md-12">
            <div className="card-outline card-danger card">
              <div className="card-header">
                <h1 className="card-title">
                  Diagnosis
                </h1>
              </div>
              <div className="p-0 card-body">
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
          <div className="mt-4 col-md-12">
            <div className="card-outline card-danger card">
              <div className="card-header">
                <h1 className="card-title">
                  Medications / Drugs
                </h1>
              </div>
              <div className="p-0 card-body">
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
          <div className="mt-4 col-md-12">
            {
              !loading && checkinDetails ? checkinDetails.testReports.map(report => (
                <React.Fragment key={report._id}>
                  <p style={{ pageBreakAfter: 'always' }}></p>
                  <img src={report.report} className="img-fluid" width={'50%'} alt="Test Report" />

                  {/* pagebreak */}

                </React.Fragment>
              )) : <p></p>
            }
          </div>
        </div>
      </div>
    </div >
  )
}

export default Export
