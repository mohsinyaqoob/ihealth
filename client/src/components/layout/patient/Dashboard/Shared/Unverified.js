import React from 'react'
import { connect } from 'react-redux'

import { logout } from '../../../../../redux/actions/patient/auth'
import Error from '../../../../../assets/img/error.gif'

const Unverified = ({ patient, logout }) => {

  document.body.style = 'background: #FEFAFA;';

  return (
    <div className="container" style={{ marginTop: '150px' }}>
      <div className="row">
        <div className="col-md-8 col-sm-10 mx-auto">
          <div className="p-5 text-center">
            <img src={Error} alt="" height="180" />
            <h1 className="font-weight-light">Hi! {patient.firstname} You are not verified yet</h1>
            <p>Unfortunately it means you wont be able to use iHealth Services. If you think you should have been verified till now, please contact your birth hospital.</p>
            <button onClick={logout} className="mt-3 btn btn-primary btn-sm">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(null, { logout })(Unverified)