import {
  AADHAAR_VALID,
  AADHAAR_INVALID,
  AADHAAR_FORM_RESET,
  OTP_VALID,
  OTP_INVALID,
  PATIENT_REGISTRATION_SUCCESS,
  PATIENT_REGISTRATION_FAILED
} from './types'

import axios from 'axios'
import { toast } from 'react-toastify'
import setAuthToken from '../../../utils/setAuthToken'


export const validateAadhaar = aadhaarNumber => async dispatch => {
  try {
    const res = await axios.post(
      '/api/patient/register/validateAadhaar',
      JSON.stringify({ aadhaarNumber }),
      { headers: { 'Content-type': 'application/json' } }
    )

    dispatch({
      type: AADHAAR_VALID,
      payload: res.data
    })

  } catch (err) {
    dispatch({
      type: AADHAAR_INVALID
    })
    const errors = err.response.data.errors;
    errors.forEach(error => toast(error.msg, { type: "error" }))
  }
}

export const resetAadhaarForm = () => async dispatch => {
  dispatch({
    type: AADHAAR_FORM_RESET
  })
}

export const validateOtp = (otp, aadhaarNumber) => async dispatch => {
  try {
    const res = await axios.post(
      '/api/patient/register/validateOtp',
      JSON.stringify({ otp, aadhaarNumber }),
      { headers: { 'Content-type': 'application/json' } }
    );

    dispatch({
      type: OTP_VALID,
      payload: res.data.registrationToken
    })

    toast('Aadhaar Number validated successfully', { type: 'success' })

  } catch (err) {
    dispatch({
      type: OTP_INVALID
    })
    const errors = err.response.data.errors;
    errors.forEach(error => toast(error.msg, { type: 'error' }))
  }
}

export const registerPatient = ({ password, birthHospital, registrationToken }) => async dispatch => {

  // Set Auth Token
  setAuthToken(registrationToken)

  try {
    const res = await axios.post('/api/patient/register',
      JSON.stringify({ password, birthHospital }),
      { headers: { 'Content-type': 'application/json' } }
    )

    dispatch({
      type: PATIENT_REGISTRATION_SUCCESS,
      payload: res.data.token
    })
  } catch (err) {
    dispatch({
      type: PATIENT_REGISTRATION_FAILED
    })

    const errors = err.response.data.errors
    errors.forEach(error => toast(error.msg, { type: 'error' }))
  }
}