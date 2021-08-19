import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'


const HealthTimeline = ({ checkinId }) => {
  const [patientCheckins, setPatientCheckins] = useState([])

  useEffect(() => {
    axios.get(`/api/doctor/data/patientCheckins?checkinId=${checkinId}`)
      .then(res => {
        setPatientCheckins(res.data.patientCheckins)
      })
      .catch(err => {
        const errors = err.response.data.errors
        errors.forEach(error => toast(error.msg, { type: 'error' }))
      })
  }, [])


  return (
    <div className="card card-primary">
      <div className="card-header">
        <div className="card-title text-bold">
          Health Timeline
        </div>
      </div>
      <div className="card-body" style={{ height: '812px' }} >
        <ul className="px-5 timeline" style={{ overflowY: 'auto', maxHeight: '750px' }}>
          {patientCheckins && patientCheckins.map(checkin => (
            <li key={checkin._id}>
              {
                checkin.checkInType.value === "emergency" ? (
                  <span className="p-1 h6 bg-red">
                    <i className="mr-2 fas fa-ambulance"></i>
                    {checkin.checkInType.label}
                  </span>
                ) : (checkin.checkInType.value === "admission" ? (
                  <span className="p-1 h6 bg-green">
                    <i className="mr-2 fas fa-ambulance"></i>
                    {checkin.checkInType.label}
                  </span>
                ) : (
                  <span className="p-1 h6 bg-yellow">
                    <i className="mr-2 fas fa-ambulance"></i>
                    {checkin.checkInType.label}
                  </span>
                ))
              }
              <span className="float-right p-1 text-gray text-bold">
                <i className="mr-1 fas fa-calendar"></i>
                <Moment format="ddd DD MMM YY">{checkin.checkInDateTime}</Moment>
              </span>
              <p className="mt-2 text-gray text-bold">
                <span className="text-gray">
                  {checkin.complaints.map((cmp, index) => (<span className="text-gray" id={index}>#{cmp + " "}</span>))}
                </span>
              </p>
              <p className="mb-2">
                <i className="mr-2 fas fa-map-marker-alt text-green"></i>
                <span className="text-bold">
                  {checkin.hospital.name}
                </span>
              </p>
              <div className="mt-4 mb-4">
                <Link
                  to={`/doctor/dashboard/detailedCheckin/${checkinId}`}
                  className="btn btn-primary btn-sm"
                >
                  View Detailed
                </Link>
              </div>
              <hr className="mt-2 mb-2 bg-black text-dark" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default HealthTimeline
