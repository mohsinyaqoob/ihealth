import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { toast } from 'react-toastify'
import Moment from 'react-moment'

import setAuthToken from '../../../utils/setAuthToken'


const BirthVerifications = () => {

  const [unverifiedBirths, setUnverifiedBirths] = useState([])
  const [loadingUnverifiedBirths, setLoadingUnverifiedBirths] = useState(true)
  const [verifySuccess, setVerifySuccess] = useState(false)

  useEffect(() => {
    if (localStorage.hospitalToken) {
      setAuthToken(localStorage.hospitalToken)
    }

    axios.get('/api/hospital/data/unverifiedBirths')
      .then(res => {
        //console.log(res.data.unverifiedBirths)
        setUnverifiedBirths(res.data.unverifiedBirths)
        setLoadingUnverifiedBirths(false)
      })
      .catch(err => {
        const errors = err.response.data.errors;
        if (errors) {
          console.log(errors)
          errors.forEach(error => toast(error.msg, { type: 'error' }))
        }
        setLoadingUnverifiedBirths(false)
      })
  }, [verifySuccess])

  const confirmVerification = async (patient) => {
    const a = await Swal.fire({
      title: `Verify ${patient.firstname} ${patient.lastname}`,
      text: `Would you like to verify: ${patient.aadhaarNumber}?`,
      icon: 'warning',
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel',
      showCancelButton: true
    })
    if (a.isConfirmed) {
      // Send post request to /api/hospital/data/verifyBirth send patientId
      try {
        const res = await axios.put('/api/hospital/data/verifyBirth', JSON.stringify({ patientId: patient._id }), { headers: { 'Content-type': 'application/json' } })
        setVerifySuccess(true)
        toast(res.data.msg, { type: 'success' })
      } catch (err) {
        const errors = err.response.data.errors;
        if (errors) {
          errors.forEach(error => toast(error.msg, { type: 'error' }))
        }
        console.log(err)
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
              <h1 className="m-0">Birth Verifications</h1>
            </div>{/* /.col */}
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">Hospital</li>
                <li className="breadcrumb-item">Dashboard</li>
                <li className="breadcrumb-item">Birth Events</li>
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
              <div className="card">
                <div className="card-header">
                  <h1 className="card-title">
                    Birth Verification Requests
                                    </h1>
                </div>
                <div className="card-body">
                  <table id="death-events-table" className="table table-hover table-bordered">
                    <thead>
                      <tr>
                        <th>Aadhaar</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>DOB</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!loadingUnverifiedBirths && unverifiedBirths.map(birth => {
                        return (
                          <tr key={birth._id}>
                            <td>{birth.aadhaarNumber}</td>
                            <td>{birth.firstname + " " + birth.middlename + " " + birth.lastname}</td>
                            <td>{birth.contact}</td>
                            <td>
                              {birth.dob ? <Moment format="dddd, DD/MM/YYYY">{birth.dob}</Moment> : <span className="text-danger">Invalid</span>}
                            </td>
                            <td>{birth.birthHospitalVerified ? "Verified" : "Not Verified"}</td>
                            <td>
                              {
                                birth.birthHospitalVerified ? (
                                  <>
                                    <button
                                      className="btn btn-sm btn-success"
                                      disabled="disabled"
                                    >Verified</button>
                                    <a href="#!" className="ml-2 btn btn-warning btn-sm">
                                      Download Birth Certificate
                                </a>
                                  </>
                                ) : (
                                  <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => { confirmVerification(birth) }}
                                  >
                                    Verify Birth
                                  </button>
                                )
                              }
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                    <tfoot></tfoot>
                  </table>
                </div>
                <div className="card-footer">
                  {/** select all from patients where birthHospitalId = thisHosId*/}
                </div>
              </div>
            </div>
          </div>
        </div>{/*/. container-fluid */}
      </section>
      {/* /.content */}
    </div>
  )
}

export default BirthVerifications
