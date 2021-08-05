import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import PatientDetails from './PatientDetails'

const RecordComplaints = (props) => {
  const checkinId = props.match.params.checkinId

  const [complaints, setComplaints] = useState([])
  const [textComplaint, setTextComplaint] = useState("")

  const handleFormSubmit = async e => {
    e.preventDefault()
    if (e.target.complaint.value === "") {
      return toast('Please enter a patient complaint', { type: 'error' })
    }
    setComplaints(oldVal => [...oldVal, textComplaint])
    setTextComplaint("")
  }

  const handleRecordComplaint = async e => {
    if (complaints.length === 0) {
      return toast('Please enter patients complaints', { type: 'error' })
    }

    try {
      const body = JSON.stringify({ complaints, checkinId })
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }
      await axios.post('/api/doctor/treatment/complaints', body, config)
      toast('Complaints recorded for this visit', { type: 'success' })
      props.history.push(`/doctor/dashboard/continueTreatment/${checkinId}`)

    } catch (err) {
      const errors = err.response.data.errors
      errors.forEach(error => toast(error.msg, { type: 'error' }))
    }
  }

  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              {/* <h1 className="m-0">{props.match.params.patientId}</h1> */}
              <span className="p-2 m-0 h4">
                Record Complaints
              </span>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Doctor</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Record Complaints</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <section className="content">
        <div className="container-fluid">
          {/* Patient Details */}
          <PatientDetails checkinId={checkinId} />
          <div className="row">
            <div className="col-md-12">
              <div className="card card-primary card-outline">
                <div className="card-header">
                  <h1 className="card-title">
                    Record Patients Complaints
                  </h1>
                </div>
                <div className="card-body">
                  <div className="mt-2 mb-3">
                    {complaints.length > 0 && complaints.map(cmp => (
                      <span className="p-2 mb-2 mr-1 badge badge-danger">{cmp}</span>
                    ))}
                  </div>
                  <form autoComplete="off" onSubmit={handleFormSubmit}>
                    <div className="mb-3 input-group">
                      <input
                        onChange={e => setTextComplaint(e.target.value)}
                        value={textComplaint}
                        type="text"
                        name="complaint"
                        className="form-control"
                        placeholder="Type patients complaint and hit enter"
                      />
                      <div className="input-group-append">
                        <button type="submit" className="input-group-text bg-green" id="basic-addon2">Add</button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer">
                  <button onClick={handleRecordComplaint} className="float-right btn btn-primary btn-sm">Record Complaints</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RecordComplaints
