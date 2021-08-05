import {
  PATIENT_FETCH_SUCCESS,
  PATIENT_FETCH_FAIL,
  RESET_PATIENT
} from './types'

import axios from 'axios'
import { toast } from 'react-toastify'

export const getPatientDetails = aadhaarNumber => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const body = JSON.stringify({ aadhaarNumber })
    const res = await axios.post('/api/agent/data/getPatientDetails', body, config)
    console.log(res.data.patient)

    dispatch({
      type: PATIENT_FETCH_SUCCESS,
      payload: res.data.patient
    })

  } catch (err) {
    dispatch({
      type: PATIENT_FETCH_FAIL
    })
    const errors = err.response.data.errors;
    errors.forEach(error => toast(error.msg, { type: 'error' }))
  }
}

export const resetPatient = () => dispatch => {
  dispatch({
    type: RESET_PATIENT
  })
}