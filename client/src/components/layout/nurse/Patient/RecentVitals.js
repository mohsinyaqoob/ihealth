import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import setAuthToken from '../../../../utils/setAuthToken'

const RecentVitals = ({ checkinId, showTotal = 3 }) => {

  const [vitals, setVitals] = useState([])

  useEffect(() => {
    setAuthToken(localStorage.nurseAuthToken)
    axios.get(`/api/nurse/data/vitals?checkinId=${checkinId}&showTotal=${showTotal}`)
      .then(res => setVitals(res.data.vitals))
      .catch(err => console.log(err.message))
  }, [])


  return (
    <div className="card card-outline card-danger">
      <div className="card-header">
        <div className="card-title">
          <span className="text-bold">Recent Vitals</span>
        </div>
        <div className="card-tools">
          <Link to={`/nurse/dashboard/recordVitals/${checkinId}`} className="bg-red btn btn-sm">
            Record Vitals
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="list-group">
          <div>
            {
              vitals.length === 0 ? (
                <span className="text-gray"> No records found...</span>
              ) : (
                vitals.map((vitalsItem) => {
                  return (
                    <a key={vitalsItem._id} href="#!" className="list-group-item list-group-item-action">
                      <i className="mr-2 fas fa-pen"></i>
                      <span>
                        SPO2: {vitalsItem.spo2} | BPS: {vitalsItem.systole} | BPD: {vitalsItem.diastole} | BS: {vitalsItem.bloodsugar} | PUL: {vitalsItem.pulse} | TMP: {vitalsItem.bodytemp}
                      </span>
                      <span className="float-right text-bold">
                        <Moment format="DD MMM YY - HH:mm">
                          {vitalsItem.recordedAt}
                        </Moment>
                      </span>
                      {/* Add date time to vitals collection */}
                    </a>
                  )
                })
              )
            }
          </div>
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/nurse/dashboard/allVitals/${checkinId}`} className="float-right btn btn-primary btn-sm">
          View All
        </Link>
      </div>
    </div>
  )
}

export default RecentVitals
