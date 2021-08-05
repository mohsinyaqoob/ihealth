import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { Redirect } from 'react-router-dom'

import setAuthToken from '../../../utils/setAuthToken'


const CreateBirthEvent = () => {

    const [unverifiedBirths, setUnverifiedBirths] = useState([])
    const [loadingUnverifiedBirths, setLoadingUnverifiedBirths] = useState(true)

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
                console.log(err)
                setLoadingUnverifiedBirths(false)
            })
    }, [])

    const confirmVerification = async () => {
        const a = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to verify this ID?',
            icon: 'warning',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            showCancelButton: true
        })
        if (a.isConfirmed) {
            // Send post request to /api/hospital/data/verifyBirth
        }

    }


    return (
        <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <div className="content-header">
                <div className="container-fluid">
                    <div className="mb-2 row">
                        <div className="col-sm-6">
                            <h1 className="m-0">Birth Events</h1>
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
                                                <th>Email</th>
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
                                                        <td>{birth.dob}</td>
                                                        <td>
                                                            <button onClick={confirmVerification} className="btn btn-primary btn-sm">
                                                                Verify
                                                            </button>
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

export default CreateBirthEvent
