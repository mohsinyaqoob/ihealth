import React, { useState, useEffect } from 'react'
import $ from 'jquery'
import axios from 'axios'
import { toast } from 'react-toastify'

import PatientDetails from './PatientDetails'

const AssignTests = props => {
  const [labtests, setLabtests] = useState([])
  const [labtestsLoading, setLabtestsLoading] = useState(true)
  const [assignedTests, setAssignedTests] = useState([])


  useEffect(() => {
    // get tests
    axios.get('/api/doctor/data/labtests')
      .then(res => {
        $(document).ready(function () {
          $('#labtests').DataTable({
            "bDestroy": true
          });
        });
        setLabtests(res.data.labtests)
        setLabtestsLoading(false)
      })
      .catch(err => {
        toast('Could not fetch lab tests', { type: 'error' })
        setLabtestsLoading(false)
      })
  }, [])


  const addTest = (id, name) => {
    // Ensure a test has not been added twice
    let valid = true;
    assignedTests.forEach(test => {
      if (id === test.id) {
        valid = false;
        toast(`${name} has been added already`, { type: 'error' })
      }
    })
    if (valid) {
      setAssignedTests([...assignedTests, { id, name }])
    }
  }

  const removeTest = (id) => {
    console.log(id)
    setAssignedTests(assignedTests.filter(test => test.id !== id))
  }

  const submitTests = async () => {
    if (assignedTests.length > 0) {
      const body = new FormData();
      assignedTests.forEach(item => {
        body.append('body[]', item);
      })

      const config = { headers: { 'Content-type': 'application/json' } }

      try {
        const res = await axios({
          url: '/api/doctor/treatment/assignTests',
          method: 'POST',
          data: { assignedTests, checkinId }
        })
        toast('Medications assigned successfully.', { type: 'success' })
        return props.history.push(`/doctor/dashboard/continueTreatment/${checkinId}`)
      } catch (err) {
        console.log(err.message)
      }
    } else {
      toast('Select atleast one lab test', { type: 'error' })
    }
  }

  const checkinId = props.match.params.checkinId;
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="mb-2 row">
            <div className="col-sm-6">
              {/* <h1 className="m-0">{props.match.params.patientId}</h1> */}
              <h1 className="m-0">
                Assign Tests
              </h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Doctor</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Assign Tests</li>
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
        </div>
        <div className="row">
          <div className="col-md-7">
            <div className="p-0 card card-danger">
              <div className="card-header">
                <h1 className="card-title">
                  Assign Tests
                </h1>
              </div>
              <div className="card-body">
                <table id="labtests" className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Test Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      !labtestsLoading && labtests.map(test => (
                        <tr key={test._id}>
                          <td className="text-bold" style={{ width: '80%' }}>{test.test_name}</td>
                          <td className="text-center">
                            <button onClick={() => { addTest(test._id, test.test_name) }} className="btn btn-primary btn-sm">
                              Add test
                            </button>
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
              <div className="card-footer"></div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="p-0 card card-danger">
              <div className="card-header">
                <h1 className="card-title">
                  Tests assigned
                </h1>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {
                    assignedTests.length === 0 ? (<span className="text-gray">No tests added...</span>) : (
                      assignedTests.map(assignedTest => (
                        <li key={assignedTest.id} className="list-group-item text-bold">
                          {assignedTest.name}
                          <a href="#!" onClick={() => { removeTest(assignedTest.id) }} className="float-right btn-sm btn btn-danger">
                            <i className="fas fa-trash"></i>
                          </a>
                        </li>
                      ))
                    )
                  }
                </ul>
              </div>
              <div className="card-footer">
                <button onClick={submitTests} type="submit" className="float-right btn btn-primary btn-sm">Assign to Patient</button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default AssignTests
