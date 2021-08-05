import React, { useState } from 'react'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'

import { validateOtp } from '../../../../redux/actions/patient/register'


const OTPForm = ({ phone, aadhaarNumber, validateOtp }) => {

  const [otp, setOtp] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    if (otp.length === 6) {
      console.log(11)
      validateOtp(otp, aadhaarNumber)
    } else {
      toast('Enter a valid 6 digit OTP', { type: 'error' })
    }
  }

  return (
    <div className="mt-3 card">
      <div className="card-body">
        <p className="login-box-msg text-bold text-red">OTP was sent to +91 ******{phone}</p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3 input-group">
            <input onChange={(e) => { setOtp(e.target.value) }} type="text" minLength="6" maxLength="6" name="otp" className="form-control" placeholder="One-time Password" />
            <div className="input-group-append">
              <div className="input-group-text">
                <span className="fas fa-at" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col">
                <button type="submit" className="float-right btn btn-success">
                  Verify
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* /.card-body */}
    </div>
  )
}

const mapStateToProps = state => ({
  phone: state.patientRegister.phone,
  aadhaarNumber: state.patientRegister.aadhaarNumber
})

export default connect(mapStateToProps, { validateOtp })(OTPForm)
