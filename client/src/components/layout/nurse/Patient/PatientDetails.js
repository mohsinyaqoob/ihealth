import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import moment from 'moment'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import setAuthToken from '../../../../utils/setAuthToken'

const PatientDetails = ({ checkinId }) => {

  const [patientDetails, setPatientDetails] = useState({})
  const [patientLoading, setPatientLoading] = useState(true)

  useEffect(() => {

    setAuthToken(localStorage.nurseAuthToken)
    // Fetch patientToTreat
    axios.get(`/api/nurse/data/basicPatientDetails?checkinId=${checkinId}`)
      .then(res => {
        setPatientDetails(res.data.patientDetails)
        setPatientLoading(false)
      })
      .catch(err => {
        console.log(err.message)
        toast('Could not fetch patient details', { type: 'error' })
        setPatientLoading(false)
      })
  }, [])


  return (
    <div className="card card-primary">
      <div className="card-header">
        <div className="card-title">
          <Link to={`/nurse/dashboard/treatment/${checkinId}`} className="p-1 text-bold">
            <i className="mr-2 fas fa-home"></i>
            Patient Details
          </Link>
        </div>
        <div className="card-tools">
          <button className="btn btn-danger btn-sm">Export Treatment Plan</button>
        </div>
      </div>
      <div className="p-0 card-body">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>Checkin Time</th>
              <th>Checkin Type</th>
              <th>Name</th>
              <th>Aadhaar</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          {!patientLoading && patientDetails.patientId && (
            <tbody>
              <tr>
                <td className="text-bold">
                  <Moment format="DD MMM YY, HH:mm">
                    {patientDetails.checkInDateTime}
                  </Moment>
                </td>
                <td>
                  {
                    patientDetails.checkInType.label
                  }
                </td>
                <td>
                  {
                    `${patientDetails.patientId.firstname} ${patientDetails.patientId.lastname} `
                  }
                </td>
                <td>
                  {
                    patientDetails.patientId.aadhaarNumber
                  }
                </td>
                <td>
                  {
                    moment(Date.now()).diff(moment(patientDetails.patientId.dob), 'y')
                  }
                </td>
                <td>
                  {
                    patientDetails.patientId.gender
                  }
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    </div>
  )
}

export default PatientDetails
