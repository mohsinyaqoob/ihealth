import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const PatientComplaint = ({ checkinId }) => {

  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)

  // Do not render button if complaints are already recorded
  useEffect(() => {
    setLoading(true)
    axios.get(`/api/doctor/data/complaints?checkinId=${checkinId}`)
      .then(res => {
        setComplaints(res.data.complaints)
        setLoading(false)
        console.log('Complaints: ', res.data.complaints)
      })
      .catch(err => {
        const errors = err.response.data.errors;
        errors.forEach(error => toast(error.msg, { type: 'error' }))
        setLoading(false)
      })
  }, [])


  return (
    <>
      {!loading && complaints && complaints.length > 0 ? (
        <div className="card card-outline card-warning">
          <div className="card-header">
            <div className="card-title">
              <span className="text-bold">Patient Complaints</span>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                {
                  !loading && complaints && complaints.map((cmp, index) => (
                    <span key={index} className="p-2 mb-2 mr-1 badge badge-warning">
                      {cmp}
                    </span>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card card-outline card-warning">
          <div className="card-header">
            <div className="card-title">
              <span className="text-bold">Patient Complaints</span>
            </div>
            <div className="card-tools">
              <Link to={`/doctor/dashboard/recordComplaints/${checkinId}`} className="btn btn-primary btn-sm">
                Record complaints
              </Link>
            </div>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-12">
                <span className="text-gray">
                  No complaints recorded...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default PatientComplaint
