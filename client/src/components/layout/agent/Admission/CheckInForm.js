import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import Select from 'react-select'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

const CheckinForm = ({ loading, patient, history }) => {

  const [medicalUnit, setMedicalUnit] = useState({
    label: '',
    value: ''
  })

  const [medicalUnits, setMedicalUnits] = useState([])

  const handleSubmit = async e => {
    e.preventDefault()

    if (medicalUnit.value === '') {
      return toast('Please choose a medical unit', { type: 'error' })
    }

    // Check in 
    console.log(patient._id, medicalUnit)
    const body = JSON.stringify(
      {
        patientId: patient._id,
        medicalUnit: medicalUnit,
        checkInType: 'admission'
      }
    )
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }

    try {
      const res = await axios.post('/api/agent/checkin', body, config)
      toast(res.data.msg, { type: 'success' })
      history.push('/agent/dashboard/checkins')
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => toast(error.msg, { type: 'error' }))
      }
    }
  }

  const handleSelectChange = e => {
    setMedicalUnit({ label: e.label, value: e.value })
  }

  useEffect(() => {
    axios.get('/api/agent/data/medicalUnits')
      .then(res => setMedicalUnits(res.data.medicalUnits))
      .catch(err => {
        const errors = err.response.data.errors;
        errors.forEach(error => {
          toast(error.msg, { type: 'error' })
        })
      })
  }, [])

  return (
    <>
      <div className="card card-primary">
        <div className="card-header">
          <span className="card-title">
            Patient Info
          </span>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
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
              <div className="col-3">
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
              <div className="col-3">
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
              <div className="mt-3 col-6">
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
              <div className="mt-3 col-3">
                <div className="form-group">
                  <label htmlFor="patientName">
                    Handphone
                  </label>
                  <input
                    type="text"
                    name="patientName"
                    id="patientName"
                    className="form-control"
                    placeholder="Handphone"
                    value={patient.contact}
                    disabled="disable"
                  />
                </div>
              </div>
              <div className="mt-3 col-3">
                <div className="form-group">
                  <label htmlFor="patientName">
                    Medical Unit
                  </label>
                  <Select
                    value={medicalUnit}
                    onChange={handleSelectChange}
                    options={medicalUnits}
                  />
                </div>
              </div>
            </div>
            <input
              type="submit"
              value="Check In"
              className="float-right mt-4 btn btn-primary"
            />
          </form>
        </div>
      </div>
    </>
  )
}

export default withRouter(CheckinForm)
