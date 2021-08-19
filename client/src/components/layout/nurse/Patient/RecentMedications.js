import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import Moment from 'react-moment'

const RecentMedications = ({ checkinId, showTotal }) => {

  const [medications, setMedications] = useState([])

  useEffect(() => {
    axios.get(`/api/nurse/data/medications?checkinId=${checkinId}&showTotal=${showTotal}`)
      .then(res => setMedications(res.data.medications))
      .catch(err => toast('Could not fetch medications', { type: 'error' }))
  }, [])


  return (
    <div className="card card-outline card-danger">
      <div className="card-header">
        <h1 className="card-title text-bold">
          Medications (Rx)
        </h1>
      </div>
      <div className="card-body">
        <div className="list-group">
          {
            medications && medications.length > 0 ? medications.map(med => (
              <a href="#!" className="list-group-item list-group-item-action">
                <i className="mr-2 fas fa-capsules"></i>
                <span>
                  {med.drug.drug_name}
                </span>
                <span className="float-right text-bold">
                  <Moment format="D/M/Y">{med.startDate}</Moment>
                  {' - '}
                  <Moment format="D/M/Y">{med.endDate}</Moment>
                </span>
                {/* Add date time to vitals collection */}
              </a>
            )) : <span className="text-gray">No medications....</span>
          }
        </div>
      </div>
      <div className="card-footer">
        <Link to={`/nurse/dashboard/allMedications/${checkinId}`} className="float-right btn btn-primary btn-sm">
          View All
        </Link>
      </div>
    </div>
  )
}

export default RecentMedications
