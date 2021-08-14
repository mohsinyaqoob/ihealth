import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

import RecentVitals from './RecentVitals'
import setAuthToken from '../../../../utils/setAuthToken'
import PatientDetails from './PatientDetails'

const ReportVitals = (props) => {
  const checkinId = props.match.params.checkinId

  const [formData, setFormData] = useState({
    spo2: '',
    systole: '',
    diastole: '',
    bloodsugar: '',
    pulse: '',
    bodytemp: '',
    checkin: props.match.params.checkinId
  })


  const handleSubmit = e => {

    setAuthToken(localStorage.nurseAuthToken)

    e.preventDefault()
    const body = JSON.stringify(formData, props.match.params.checkinId)
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    axios.post('/api/nurse/treatment/vitals', body, config)
      .then(res => {
        toast(res.data.msg, { type: 'success' })
        setFormData({})
        props.history.push(`/nurse/dashboard/treatment/${formData.checkin}`)
      })
      .catch(err => {
        const errors = err.response.data.errors;
        errors.forEach(error => toast(error.msg, { type: 'error' }))
      })
  }

  const normalVitals = e => {
    e.preventDefault()
    setFormData({
      ...formData,
      spo2: '98',
      systole: '120',
      diastole: '90',
      bloodsugar: '95',
      pulse: '80',
      bodytemp: '98',
    })
  }



  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              {/* <h1 className="m-0">{props.match.params.patientId}</h1> */}
              <h1 className="m-0">
                Report Vitals
              </h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Nurse</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Report Vitals</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="row">
          <div className="col-md-12">
            <PatientDetails checkinId={checkinId} />
          </div>
        </div>
        <div className="container-fluid">
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="card card-danger">
              <div className="card-header">
                <h1 className="card-title text-bold">
                  Report Patient Vitals
                </h1>
                <div className="card-tools">
                  {/*  */}
                  <button onClick={normalVitals} className="bg-white btn btn-sm">
                    Vitals Normal
                  </button>
                </div>
              </div>
              <div className="card-body">

                <div className="row">
                  <div className="col-2">
                    <div className="form-group">
                      <label htmlFor="spo2">SPO2</label>
                      <input onChange={handleChange} value={formData.spo2} type="text" name="spo2" id="spo2" className="form-control" maxLength="3" placeholder="O2 Saturation" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label htmlFor="spo2">BP Systole</label>
                      <input onChange={handleChange} value={formData.systole} type="text" name="systole" id="spo2" className="form-control" maxLength="3" placeholder="Systole" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label htmlFor="spo2">BP Diastole</label>
                      <input onChange={handleChange} value={formData.diastole} type="text" name="diastole" id="spo2" className="form-control" maxLength="3" placeholder="Diastole" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label htmlFor="spo2">Blood Sugar</label>
                      <input onChange={handleChange} value={formData.bloodsugar} type="text" name="bloodsugar" id="spo2" className="form-control" maxLength="3" placeholder="Blood Sugar" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label htmlFor="spo2">Pulse</label>
                      <input onChange={handleChange} value={formData.pulse} type="text" name="pulse" id="spo2" className="form-control" maxLength="3" placeholder="Pulse" />
                    </div>
                  </div>
                  <div className="col-2">
                    <div className="form-group">
                      <label htmlFor="spo2">Body Temp. (in F)</label>
                      <input onChange={handleChange} value={formData.bodytemp} type="text" name="bodytemp" id="spo2" className="form-control" maxLength="3" placeholder="Body Temperature" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="float-right btn btn-primary btn-sm">Record</button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-md-12">
          <RecentVitals checkinId={props.match.params.checkinId} showTotal={100} />
        </div>
      </section>
    </div>
  )
}

export default ReportVitals
