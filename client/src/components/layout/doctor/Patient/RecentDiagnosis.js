import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'

import setAuthToken from '../../../../utils/setAuthToken'

const RecentDiseases = ({ checkinId, showTotal = 3 }) => {

  const [diagnosedDiseases, setDiagnosedDiseases] = useState([])

  useEffect(() => {
    setAuthToken(localStorage.doctorToken)
    axios.get(`/api/doctor/data/diagnosedDiseases?checkinId=${checkinId}&showTotal=${showTotal}`)
      .then(res => setDiagnosedDiseases(res.data.diagnosedDiseases))
      .catch(err => console.log(err.message))
  }, [])


  return (
    <div className="card card-outline card-danger">
      <div className="card-header">
        <div className="card-title">
          <span className="text-bold">Diseases</span>
        </div>
        <div className="card-tools">
          <Link to={`/doctor/dashboard/recordDiagnosis/${checkinId}`} className="bg-red btn btn-sm">
            Record Diagnosis
          </Link>
        </div>
      </div>
      <div className="card-body">
        <div className="list-group">
          <div>
            {
              diagnosedDiseases.length > 0 ? diagnosedDiseases.map(disease => (
                <a key={disease._id} href="#!" className="list-group-item list-group-item-action">
                  <i className="mr-2 fas fa-book-medical"></i>
                  <span className="p-1 bg-red text-gray text-bold">{disease.disease.name}</span> on <Moment format="ddd DD MMM YY">{disease.diagnosisDate}</Moment>
                </a>
              )) : (<span className="text-gray">No diagnosis recorded...</span>)
            }
          </div>
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/doctor/dashboard/allDiagnosis/${checkinId}`} className="float-right btn btn-primary btn-sm">
          View All
        </Link>
      </div>
    </div>
  )
}

export default RecentDiseases
