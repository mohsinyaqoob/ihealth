import React, { useState, useEffect } from 'react'
import PatientDetails from './PatientDetails'
import axios from 'axios'
import Moment from 'react-moment'

const AddMedications = props => {

  const checkinId = props.match.params.checkinId

  const [medications, setMedications] = useState([])

  useEffect(() => {
    axios.get(`/api/nurse/data/medications?checkinId=${checkinId}&showTotal=${100}`)
      .then(res => setMedications(res.data.medications))
      .catch(err => toast('Could not fetch medications', { type: 'error' }))
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
                Medications
              </span>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Nurse</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Medications</li>
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
            <div className="col-md-12">
              {/* <RecentMedications checkinId={checkinId} showTotal={5} /> */}
              <div className="p-0 card card-outline card-danger">
                <div className="card-header">
                  <h1 className="card-title text-bold">
                    Rx. (Medications)
                  </h1>
                </div>
                <div className="p-0 card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th width="60%">Drug Name</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Schedule</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        medications.length > 0 ? medications.map(medication => (
                          <tr>
                            <td>{medication.drug.drug_name}</td>
                            <td>
                              <Moment format="D MMM y">
                                {medication.startDate}
                              </Moment>
                            </td>
                            <td>
                              <Moment format="D MMM y">
                                {medication.endDate}
                              </Moment>
                            </td>
                            <td>
                              <span className="p-1 badge badge-danger">
                                {medication.schedule.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        )) : <tr><td><span className="text-gray">No medications...</span></td></tr>
                      }
                    </tbody>
                  </table>
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
