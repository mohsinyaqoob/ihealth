import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { toast } from 'react-toastify'

import PatientDetails from './PatientDetails'
import RecentDiagnosis from './RecentDiagnosis'

const DiagnosisForm = props => {

  const checkinId = props.match.params.checkinId;

  const suggestionStyles = {
    position: 'absolute',
    height: '70px',
    width: '97%',
    marginTop: '3px'
  }

  const [formData, setFormData] = useState({
    diagnosis: '',
    otherDiagnosis: '',
    diagnosisId: ''
  })

  const [diseases, setDiseases] = useState([])

  const [otherDiagnosisCheck, setOtherDiagnosisCheck] = useState(false)


  useEffect(() => {
    if (formData.diagnosis.length > 1) {
      axios.get(`/api/doctor/data/diseases?searchQuery=${formData.diagnosis}`)
        .then(res => setDiseases(res.data.diseases))
        .catch(err => console.log(err.message))
    }
  }, [formData.diagnosis])

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    if (!otherDiagnosisCheck) {
      if (!formData.diagnosis) {
        return toast('Please record your diagnosis', { type: 'error' })
      }
    } else {
      if (!formData.otherDiagnosis) {
        return toast('Please mention a diagnosis in the textbox', { type: 'error' })
      }
    }

    try {
      // Submit Disease
      const res = await axios.post(
        `/api/doctor/treatment/diagnosis?checkinId=${checkinId}`, JSON.stringify({ formData }), { headers: { 'Content-type': 'application/json' } })
      toast(res.data.msg, { type: 'success' })
      props.history.push(`/doctor/dashboard/continueTreatment/${checkinId}`)
    } catch (err) {
      const errors = err.response.data.errors;
      errors.forEach(error => toast(error.msg, { type: 'error' }))
    }
  }

  const handleCheckChange = e => {
    if (e.target.checked) {
      setOtherDiagnosisCheck(true)
      setFormData({ ...formData, diagnosis: '', diagnosisId: '' })
    } else {
      setOtherDiagnosisCheck(false)
      setFormData({ ...formData, otherDiagnosis: '' })
    }
  }

  const handleSuggestionsClick = e => {
    setFormData({ ...formData, diagnosisId: e.target.getAttribute('data-disease'), diagnosis: e.target.innerText });
    setDiseases([])
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
                Record Diagnosis
              </h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Doctor</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Record Diagnosis</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <section className="content">
        <div className="container-fluid">
          <PatientDetails checkinId={checkinId} />
          <div className="row">
            <div className="col-md-8">
              <form onSubmit={handleSubmit} autoComplete="off">
                <div className="card card-danger">
                  <div className="card-header">
                    <h1 className="card-title text-bold">
                      Record diagnosis
                    </h1>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-8">
                        <div className="form-group">
                          <label htmlFor="spo2">Diagnosis</label>
                          <input
                            value={formData.diagnosis}
                            onChange={handleChange}
                            type="text" name="diagnosis"
                            id=""
                            className="form-control"
                            placeholder="Type your diagnosis..." disabled={otherDiagnosisCheck ? "disabled" : ""}
                          />
                          <div className="list-group suggestions" style={suggestionStyles}>
                            {diseases.length > 0 && diseases.map(disease => (
                              <span onClick={handleSuggestionsClick} key={disease._id} data-disease={disease._id} className="list-group-item list-group-item-action" >
                                {disease.abbr} / {disease.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="form-group">
                          <label htmlFor="otherDiagnosis">
                            <input onChange={handleCheckChange} type="checkbox" name="otherDiagnosisCheck" className="mr-1" />
                            Other Diagnosis
                          </label>
                          <input value={formData.otherDiagnosis} onChange={handleChange} id="otherDiagnosis" type="text" name="otherDiagnosis" className="form-control" placeholder="Other Diagnosis" disabled={!otherDiagnosisCheck ? 'disabled' : ''} />
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
            <div className="col-md-4">
              <RecentDiagnosis checkinId={checkinId} showTotal={3} />
            </div>
          </div>
        </div>
        <div className="col-md-12">
          {/* Recent Diagnosis */}
        </div>
      </section>
    </div>
  )
}

export default DiagnosisForm
