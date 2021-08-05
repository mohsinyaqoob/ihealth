import React, { useState, useEffect } from 'react'
import RecentMedications from './RecentMedications'
import PatientDetails from './PatientDetails'
import axios from 'axios'
import { toast } from 'react-toastify'
import DatePicker from 'react-datepicker'

import "react-datepicker/dist/react-datepicker.css";

const AddMedications = props => {

  const checkinId = props.match.params.checkinId

  const suggestionStyles = {
    position: 'absolute',
    height: '70px',
    width: '98%',
    marginTop: '5px'
  }

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }


  const [medication, setMedication] = useState('')
  const [assignedMedications, setAssignedMedications] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    axios.get(`/api/doctor/data/drugs?searchQuery=${medication}`)
      .then(res => {
        setSuggestions(res.data.drugs)
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        const errors = err.response.data.errors;
        if (errors && errors.length > 0) {
          errors.forEach(error => toast(error.msg, { type: 'error' }))
        }
      })
  }, [medication])

  const handleTextChange = async e => {
    setMedication(e.target.value)
  }

  const handleDrugAdd = e => {
    let medications = [...assignedMedications];
    if (medications.find(v => v.drugId === e.target.getAttribute('data-drug-id'))) {
      toast('Drug already added', { type: 'error' })
    } else {
      setAssignedMedications([
        ...assignedMedications, {
          drugId: e.target.getAttribute('data-drug-id'),
          drugName: e.target.getAttribute('data-drug-name')
        }
      ])
    }
  }

  const handlePrescriptionChange = (event, drugId, index) => {
    let medications = [...assignedMedications];
    medications[index][event.target.name] = event.target.value;
    setAssignedMedications(medications);
  }

  const removeMedicine = index => {
    // Remove medicine
  }

  const handlePrescribe = async event => {
    if (assignedMedications.length === 0) {
      return toast('Please prescribe the medications', { type: 'error' })
    }

    for (let i = 0; i < assignedMedications.length; i++) {
      if (!assignedMedications[i].startDate || !assignedMedications[i].endDate || !assignedMedications[i].schedule) {
        return toast('Start date and end date is mandatory for medications', { type: 'error' })
      }
    }

    try {
      const body = JSON.stringify({ assignedMedications, checkinId })
      const config = {
        headers: {
          'Content-type': 'application/json'
        }
      }

      await axios.post('/api/doctor/treatment/assignMedication', body, config)
      toast('Medications prescribed', { type: 'success' })
      props.history.push('/doctor/dashboard/continueTreatment/' + checkinId)

    } catch (err) {
      console.log(err.message)
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error => toast(error.msg, { type: 'error' }))
      }
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
                Add Medications
              </span>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Doctor</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Add Medications</li>
              </ol>
            </div>{/* /.col */}
          </div>{/* /.row */}
        </div>{/* /.container-fluid */}
      </div>
      <section className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              <PatientDetails checkinId={checkinId} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="p-0 card card-primary card-outline">
                <div className="card-header">
                  <h1 className="card-title text-bold">
                    Prescribe Medications
                  </h1>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-12">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Type a drug name and hit enter..."
                          onChange={handleTextChange}
                        />
                        <div className="list-group suggestions" style={suggestionStyles}>
                          {
                            !loading && suggestions && suggestions.map((sug, index) => (
                              <span
                                key={index}
                                className="list-group-item list-group-item-action"
                              >

                                {sug.drug_name}

                                <i
                                  onClick={handleDrugAdd}
                                  data-drug-id={sug._id}
                                  data-drug-name={sug.drug_name}
                                  className="float-right p-1 rounded fas fa-plus bg-red"
                                >
                                </i>
                              </span>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              {/* <RecentMedications checkinId={checkinId} showTotal={5} /> */}
              <div className="p-0 card card-outline card-danger">
                <div className="card-header">
                  <h1 className="card-title text-bold">
                    Rx. (Medical Prescription)
                  </h1>
                </div>
                <div className="p-0 card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th style={{ width: '55%' }}>Drug Name</th>
                        <th style={{ width: '15%' }}>Schedule</th>
                        <th style={{ width: '30%' }}>From - To</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        assignedMedications.length > 0 && assignedMedications.map((med, index) => (
                          <tr key={index}>
                            <td>
                              {med.drugName}
                              <a onClick={e => { removeMedicine(index) }} href="!#" className="float-right">
                                <i className="fas fa-trash text-red"></i>
                              </a>
                            </td>
                            <td>
                              <div className="form-group">
                                <select onChange={(e) => { handlePrescriptionChange(e, med.drugId, index) }} name="schedule" id="" className="form-control">

                                  <option value="">--</option>
                                  <option value="bd">BD</option>
                                  <option value="od">OD</option>
                                  <option value="tid">TID</option>
                                  <option value="bbf">BBF</option>
                                  <option value="bt">BT</option>
                                  <option value="sos">SOS</option>
                                </select>
                              </div>
                            </td>
                            <td>
                              <div className="form-group">
                                <input type="date" onChange={(e) => { handlePrescriptionChange(e, med.drugId, index) }} name="startDate" id="" className="mb-2 form-control" />
                                <input type="date" onChange={(e) => { handlePrescriptionChange(e, med.drugId, index) }} name="endDate" id="" className="form-control" />
                              </div>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>
                <div className="card-footer">
                  <button onClick={handlePrescribe} className="float-right btn btn-sm btn-primary">
                    Prescribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AddMedications
