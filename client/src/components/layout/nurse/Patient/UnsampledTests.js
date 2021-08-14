import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Moment from 'react-moment'

import setAuthToken from '../../../../utils/setAuthToken'

const UnsampledTests = ({ checkinId, showTotal = 3 }) => {

  const [labtests, setLabTests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setAuthToken(localStorage.doctorToken)
    axios.get(`/api/doctor/treatment/labtests?checkinId=${checkinId}&showTotal=${showTotal}`)
      .then(res => {
        setLabTests(res.data.labtests)
        setLoading(false)
      })
      .catch(err => console.log(err.message))
  }, [])

  return (
    <div className="card card-outline card-danger">
      <div className="card-header">
        <div className="card-title">
          <span className="text-bold">Lab Tests</span>
        </div>
        <div className="card-tools">
          <Link to={`/doctor/dashboard/assignTests/${checkinId}`} className="bg-red btn btn-sm">
            Assign Tests
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="list-group">
          <div>
            {
              !loading && labtests.length > 0 ? labtests.map(labtest => (
                <a href="#!" key={labtest._id} className="list-group-item list-group-item-action">
                  <i className="mr-2 fas fa-medkit"></i>
                  <span className="p-1 mr-2 text-bold bg-red">
                    {labtest.assignedTest.test_name} {' '}
                  </span>
                  recorded at
                  <span className="ml-2 text-gray">
                    <Moment format="DD MMM YYYY">{labtest.assignedDate}</Moment>
                  </span>
                  <span className="float-right">
                    {labtest.testStatus === 1 ? (<i className="fas fa-times-circle text-red"></i>) : (labtest.testStatus === 2 ? (<i className="fas fa-exclamation-circle text-warning"></i>) : (<i className="fas fa-check-circle text-green"></i>))}
                  </span>
                </a>
              )) : (<span className="text-gray">No tests added...</span>)
            }
          </div>
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/doctor/dashboard/allTests/${checkinId}`} className="float-right btn btn-primary btn-sm">
          View All
        </Link>
      </div>
    </div>
  )
}

export default UnsampledTests
