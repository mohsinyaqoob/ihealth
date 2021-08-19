import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Moment from 'react-moment'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

import setAuthToken from '../../../../utils/setAuthToken'

const RevealAssignedImagingTests = props => {

  const [assignedImagingTests, setAssignedImagingTests] = useState([])
  const [testsFetched, setTestsFetched] = useState(false)

  const patientId = props.match.params.patientId;
  useEffect(() => {
    setAuthToken(localStorage.labAuthToken)
    axios.get(`/api/lab/data/assignedImagingTests?patient=${patientId}`)
      .then(res => {
        setAssignedImagingTests(res.data.assignedImagingTests)
        setTestsFetched(true)
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
              <h1 className="m-0">Assigned Imaging Tests</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Laboratory</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Assigned Imaging Tests</li>
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
              <div className="card card-primary">
                <div className="card-header">
                  <h1 className="card-title">
                    Imaging Tests
                  </h1>
                  <div className="card-tools">
                    <Link to={`/lab/dashboard/bodyFluidInvestigation`} className="bg-white btn btn-white btn-sm">Go Back</Link>
                  </div>
                </div>
                <div className="p-0 card-body">
                  <table className="table table-bordered table-hover">
                    <thead>
                      <tr>
                        <th>Test Name</th>
                        <th>Assigned Date/Time</th>
                        <th>Status</th>
                        <th>Report</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        assignedImagingTests.map(test => (
                          <tr key={test._id}>
                            <td>{test.assignedTest.test_name}</td>
                            <td>
                              <Moment format="D MMM Y @ h:mm A">
                                {test.assignedDate}
                              </Moment>
                            </td>
                            <td>
                              {
                                test.testStatus === 1 ? <span className="p-1 bg-red">Not ready</span> : <span className="p-1 bg-green">Ready</span>
                              }
                            </td>
                            <td>
                              {
                                test.testStatus === 1 ? <Link to={`/lab/dashboard/uploadImagingReport/${test.patient}/${test._id}`} className="btn btn-primary btn-sm">Upload Report</Link> : <a href={test.report} target="_blank" className="btn btn-success btn-sm">Reveal Report</a>
                              }
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
                <div className="card-footer"></div>
              </div>
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div>

  )
}

export default RevealAssignedImagingTests
