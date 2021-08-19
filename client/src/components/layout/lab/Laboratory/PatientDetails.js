import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const PatientDetails = ({ patient }) => {

  return (
    <>
      <div className="card card-primary">
        <div className="card-header">
          <span className="card-title">
            Patient Information
          </span>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="patientName">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="patientName"
                  id="patientName"
                  className="form-control"
                  placeholder="Name of Patient"
                  value={`${patient.firstname} ${patient.lastname}`}
                  disabled="disable"
                />
              </div>
            </div>
            <div className="col-2">
              <div className="form-group">
                <label htmlFor="patientName">
                  Age
                </label>
                <input
                  type="text"
                  name="patientName"
                  id="patientName"
                  className="form-control"
                  placeholder="Age"
                  value={moment().diff(patient.dob, 'years')}
                  disabled="disable"
                />
              </div>
            </div>
            <div className="col-2">
              <div className="form-group">
                <label htmlFor="patientName">
                  Gender
                </label>
                <input
                  type="text"
                  name="patientName"
                  id="patientName"
                  className="form-control"
                  placeholder="Gender"
                  value={patient.gender}
                  disabled="disabled"
                />
              </div>
            </div>
            <div className="col-4">
              <div className="form-group">
                <label htmlFor="patientName">
                  Residence
                </label>
                <input
                  type="text"
                  name="patientName"
                  id="patientName"
                  className="form-control"
                  placeholder="Residence"
                  value={patient.permanentAddress}
                  disabled="disabled"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Link to={`/lab/dashboard/revealAssignedLabTests/${patient._id}`} className="float-right mt-4 btn btn-danger">
                Reveal Assigned Tests
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PatientDetails
